"use client";

import React, {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback,
} from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { BasicFade } from "@styles/motion";

import { sortData } from "@modules/chartSlice";
import { useAppDispatch, useAppSelector } from "@modules/hooks";
import useResize from "@hooks/useResize";
import { DataProps } from "@/app/preview/chart/types";

export default function BarChart(props: { data: DataProps[] }) {
  // 사이즈 설정
  const margin = { top: 10, right: 0, bottom: 30, left: 60 };
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [chartWidth, setChartWidth] = useState<number>(
    windowSize > 1000 ? 800 : windowSize * 0.9,
  );
  const [chartHeight, setChartHeight] = useState<number>(
    windowSize > 1000 ? 500 : 350,
  );
  useLayoutEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useResize((w: number) => {
    setWindowSize(w);
  });

  // 데이터
  // eslint-disable-next-line react/destructuring-assignment
  const [chartSortData, setChartSortData] = useState(props.data);
  const dispatch = useAppDispatch();
  const selectCountries = useAppSelector(
    (state) => state.chartReducer.selectCountries,
  );

  useEffect(() => {
    dispatch(sortData(chartSortData));
    setChartSortData(chartSortData);
  }, [dispatch, chartSortData]);

  // 막대 그래프
  const svgRef = useRef(null);

  // 컬러 설정
  const xMax: any = d3.max(chartSortData, (d) => d.population as number);
  const colorScale = d3.scaleLinear().domain([0, xMax]).range([0.3, 1]);

  const drawBarChart = useCallback(() => {
    const svg = d3.select(svgRef.current);

    // X스케일 설정
    const xScale = d3
      .scaleBand()
      .domain(chartSortData.map((d) => d.translations.kor.common))
      .range([margin.left, chartWidth - margin.left])
      .padding(0.2);

    // Y스케일 설정
    const yScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([chartHeight - margin.top - margin.bottom, margin.top])
      .nice();

    // Axis 만들기
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

    svg
      .select<SVGSVGElement>(".x_axis")
      .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
      .call(xAxis);

    svg.selectAll(".tick").attr("width", xScale.bandwidth());

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(chartSortData.length)
      .tickSizeInner(0)
      .tickSizeOuter(0);

    svg
      .select<SVGSVGElement>(".y_axis")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    // 막대 그래프 그리기
    svg.selectAll(".bar_group").remove();
    svg
      .append<SVGSVGElement>("g")
      .attr("class", "bar_group")
      .selectAll("rect")
      .data(chartSortData)
      .enter()
      .append<SVGRectElement>("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.translations.kor.common) as number)
      .attr("y", (d) => yScale(d.population) + margin.top)
      .attr("width", xScale.bandwidth())
      .attr(
        "height",
        (d) => chartHeight - margin.bottom - margin.top - yScale(d.population),
      )
      .style("fill", (d) => d3.interpolateGnBu(colorScale(d.population)));
  }, [
    chartSortData,
    colorScale,
    xMax,
    chartHeight,
    chartWidth,
    margin.bottom,
    margin.left,
    margin.top,
  ]);
  useEffect(() => {
    setChartWidth(windowSize > 1000 ? 800 : windowSize * 0.8);
    setChartHeight(windowSize > 1000 ? 500 : 350);

    drawBarChart();
  }, [windowSize, drawBarChart]);

  return (
    <motion.div className="barchart" variants={BasicFade} custom={0.8}>
      <svg ref={svgRef} width={chartWidth} height={chartHeight}>
        <g className="x_axis" />
        <g className="y_axis" />
        <g className="bar_group" />
      </svg>
      <ul className="bar_legend">
        {selectCountries.length > 0 &&
          selectCountries.map((item: DataProps) => (
            <li key={item.population}>
              <svg className="color_table" width={14} height={14}>
                <rect
                  className="color_table_rect"
                  width={14}
                  height={14}
                  fill={d3.interpolateGnBu(colorScale(item.population))}
                />
              </svg>
              <p className="countries_name">{item.translations.kor.common}</p>
            </li>
          ))}
      </ul>
    </motion.div>
  );
}
