import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

const Demo = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = d3.select(containerRef.current);

    const width = container.node().clientWidth || 960;
    const height = 600;
    const csvUrl = `${process.env.PUBLIC_URL}/data/data.csv`; 


    container.selectAll("*").remove();

    const slider = container.append("input")
      .attr("type", "range")
      .attr("min", 0)
      .attr("step", 1)
      .style("width", (width * 0.9) + "px") 
      .style("margin", "0 auto 10px auto")  
      .style("display", "block");           

    const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 150}, ${10})`);

      legend.append("rect")
        .attr("width", 140)
        .attr("height", 80)
        .attr("rx", 8)
        .attr("ry", 8)
        .attr("fill", "white")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1)
        .attr("opacity", 0.9);

      // Legend entries
      const items = [
        { color: "steelblue", label: "Actual (past)" },
        { color: "red", label: "Actual (latest)" },
        { color: "orange", label: "Predicted" },
      ];

      items.forEach((item, i) => {
        legend.append("circle")
          .attr("cx", 20)
          .attr("cy", 20 + i * 20)
          .attr("r", 5)
          .attr("fill", item.color);

        legend.append("text")
          .attr("x", 40)
          .attr("y", 20 + i * 20)
          .attr("alignment-baseline", "middle")
          .attr("font-size", "12px")
          .attr("font-family", "Arial")
          .text(item.label);
      });

    const timeText = svg.append("g").attr("class", "time-text");

    const projection = d3.geoAlbersUsa()
      .scale(1000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath(projection);

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(usTopo => {
      const states = feature(usTopo, usTopo.objects.states);

      svg.append("path")
        .datum(states)
        .attr("d", path)
        .attr("fill", "#eee")
        .attr("stroke", "#999");

      d3.csv(csvUrl, d3.autoType).then(data => {
        data.forEach((d, i) => d.frame = i);

        slider.attr("max", data.length - 1);
        slider.property("value", 16); 

        const pointsGroup = svg.append("g").attr("class", "points");

        function update(frame) {
          let visibleData = [];

          if (frame < 15) {
            // For frames 0..14 show actual up to frame inclusive
            visibleData = data.slice(0, frame + 1).map(d => ({ ...d, type: "actual" }));
          } else {
            // For frame >= 15:
            // actual: last 15 points before current frame + current actual point (total 16 actual points)
            // predicted: current predicted point at frame

            const actual = data.slice(frame - 15, frame + 1).map(d => ({ ...d, type: "actual" }));
            const predicted = data.slice(frame, frame + 1).map(d => ({ ...d, type: "pred" }));
            visibleData = actual.concat(predicted);
          }


          visibleData = visibleData.filter(d => {
            const coords = d.type === "pred"
              ? projection([d.pred_lon, d.pred_lat])
              : projection([d.actual_lon, d.actual_lat]);
            return coords !== null && coords !== undefined;
          });
          const latestActual = visibleData
              .filter(d => d.type === "actual")
              .sort((a, b) => b.frame - a.frame)[0];

          const latestPred = visibleData
            .filter(d => d.type === "pred")
            .sort((a, b) => b.frame - a.frame)[0];

          let actualTimeText = latestActual ? `Actual Time: \u00A0\u00A0\u00A0${latestActual.acutual_time}` : "";
          let predTimeText = latestPred ? `Predicted Time: ${latestPred.pred_time}` : "";

          if (frame < 16) predTimeText = "";  

          timeText.selectAll("text").remove();

          if (actualTimeText) {
            timeText.append("text")
              .attr("x", 10)
              .attr("y", 20)
              .attr("font-size", "14px")
              .attr("font-family", "monospace")
              .attr("fill", "#333")
              .text(actualTimeText);
          }
          if (predTimeText) {
            timeText.append("text")
              .attr("x", 10)
              .attr("y", 40)
              .attr("font-size", "14px")
              .attr("font-family", "monospace")
              .attr("fill", "#333")
              .text(predTimeText);
          }

          const circles = pointsGroup.selectAll("circle")
            .data(visibleData, d => d.frame + "-" + d.type);

          const actualFrames = visibleData.filter(d => d.type === "actual").map(d => d.frame);
          const maxActualFrame = actualFrames.length > 0 ? Math.max(...actualFrames) : null;

          circles.enter()
            .append("circle")
            .attr("r", 5)
            .attr("opacity", d => d.type === "pred" ? 0.8 : 1)
            .attr("fill", d => {
              if (d.type === "pred") return "orange";
              if (d.frame === maxActualFrame) return "green";
              return "steelblue";
            })
            .attr("cx", d => {
              const coords = d.type === "pred"
                ? projection([d.pred_lon, d.pred_lat])
                : projection([d.actual_lon, d.actual_lat]);
              return coords ? coords[0] : -10;
            })
            .attr("cy", d => {
              const coords = d.type === "pred"
                ? projection([d.pred_lon, d.pred_lat])
                : projection([d.actual_lon, d.actual_lat]);
              return coords ? coords[1] : -10;
            })
            .merge(circles)
            .transition()
            .duration(150)
            .attr("cx", d => {
              const coords = d.type === "pred"
                ? projection([d.pred_lon, d.pred_lat])
                : projection([d.actual_lon, d.actual_lat]);
              return coords ? coords[0] : -10;
            })
            .attr("cy", d => {
              const coords = d.type === "pred"
                ? projection([d.pred_lon, d.pred_lat])
                : projection([d.actual_lon, d.actual_lat]);
              return coords ? coords[1] : -10;
            })
            .attr("fill", d => {
              if (d.type === "pred") return "orange";
              if (d.frame === maxActualFrame) return "red";
              return "steelblue";
            });

          circles.exit().remove();
        }

        update(16);

        slider.on("input", function () {
          update(+this.value);
        });
      });
    });


    return () => {
      container.selectAll("*").remove();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%" }} />
  );
};

export default Demo;
