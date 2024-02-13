function GroupGraph(el, data){
    this.chart = null;
    this.data = null;
    this.dataLen = null;
    this.$btn = null;
    this.len = null;
    this.$onBtn = null;
    this.onLen = null;
    this.onIndex = [];
    this.selectData = [];
    this.categoryAxis = null;
    this.valueAxis = null;
    this.series = null;
    this.interfaceColors = null;
    this.delIndex = null;

    this._init(data);
    this._chartTheme();
    this._creatChart(el);
    this._onFind();
    this._extractData();
    this._inputData();
    this._createAxisX();
    this._createAxisY();
    this._seriesView(el);
    this._createScrollbar();
    this._createCursor();
    this._createLegend();
};
GroupGraph.prototype._init = function (data) {
    this.data = data;
    this.dataLen = this.data.length;
    this.$btn = $('.btn_graph');
    this.len = this.$btn.length;
    this.$onBtn = $('.btn_graph.on');
    this.onLen = this.$onBtn.length;
};
GroupGraph.prototype._initUpdate = function () {
    this.$onBtn = $('.btn_graph.on');
    this.onLen = this.$onBtn.length;
};
GroupGraph.prototype._chartTheme = function () {
    am4core.useTheme(wave);
    am4core.useTheme(am4themes_animated);
};
GroupGraph.prototype._creatChart = function (el) {
    this.chart = am4core.create(el, am4charts.XYChart);
    this.chart.paddingRight = 30;
};
GroupGraph.prototype._onFind = function () {
    for (var i = 0; i < this.len; i++) {
        if(this.$btn.eq(i).hasClass("on") === true){
            this.onIndex.push(this.$btn.eq(i).closest('.grid_row').index());
        }
    }
};
GroupGraph.prototype._extractData = function () {
    for (var i = 0; i < this.dataLen; i++) {
        this.selectData.push({
            date: this.data[i].date
        });

        for(var j = 0; j < this.onLen; j++){
            switch(j) {
                case 0:
                    this.selectData[i]["group"+this.onIndex[0]] = this.data[i]["group"+ (this.onIndex[j]+1)];
                    break;
                case 1:
                    this.selectData[i]["group"+this.onIndex[1]] = this.data[i]["group"+ (this.onIndex[j]+1)];
                    break;
                case 2:
                    this.selectData[i]["group"+this.onIndex[2]] = this.data[i]["group"+ (this.onIndex[j]+1)];
                    break;
                case 3:
                    this.selectData[i]["group"+this.onIndex[3]] = this.data[i]["group"+ (this.onIndex[j]+1)];
                    break;
                case 4:
                    this.selectData[i]["group"+this.onIndex[4]] = this.data[i]["group"+ (this.onIndex[j]+1)];
                    break;
            }
        }
    }
};
GroupGraph.prototype._inputData = function () {
    this.chart.data = this.selectData;
}
GroupGraph.prototype._createAxisX = function () {
    this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    this.categoryAxis.dataFields.category = "date";
};
GroupGraph.prototype._createAxisY = function () {
    this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    this.valueAxis.renderer.minWidth = 35;
};
GroupGraph.prototype._createSeries = function (field, name) {
    this.series = this.chart.series.push(new am4charts.LineSeries());
    this.series.dataFields.valueY = field;
    this.series.dataFields.categoryX = "date";
    this.series.strokeWidth = 2;
    this.series.minBulletDistance = 10;
    this.series.yAxis = this.valueAxis;
    this.series.name = name;
    this.series.tooltipText = "{valueY} 개";
    this.series.tooltip.pointerOrientation = "vertical";
    this.series.tooltip.background.fillOpacity = 0.7;
    this.series.tooltip.autoTextColor = false;
    this.interfaceColors = new am4core.InterfaceColorSet();
};
GroupGraph.prototype._seriesView = function (el) {
    for (var i = 0; i < this.onLen; i++) {
        this._createSeries("group"+this.onIndex[i], $("#ebaySale .grid_body .scrolled").find(".grid_row").eq(this.onIndex[i]).find(".grid_cell").eq(2).text()); // 2번째 매개변수 그룹명으로 변경 필요
    }
};
GroupGraph.prototype._createScrollbar = function () {
    this.chart.scrollbarX = new am4charts.XYChartScrollbar();
    this.chart.scrollbarX.series.push(this.series);
};
GroupGraph.prototype._createCursor = function () {
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.xAxis = this.categoryAxis;
    this.chart.cursor.snapToSeries = this.series;
    this.chart.cursor.behavior = "zoomY";
};
GroupGraph.prototype._createLegend = function () {
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.height = '25';
};
GroupGraph.prototype._dataAdd = function (i) {
    this._initUpdate();
    this.onIndex.push(i);

    for (var i = 0; i < this.dataLen; i++) {
        this.selectData[i]["group"+this.onIndex[this.onIndex.length - 1]] = this.data[i]["group"+ (parseInt(this.onIndex[this.onLen-1])+1)];
    }

    this.chart.data = this.selectData;
};
GroupGraph.prototype._seriesAdd = function (i) {
    this._createSeries("group"+i, $("#ebaySale .grid_body .scrolled").find(".grid_row").eq(this.onIndex[this.onLen-1]).find(".grid_cell").eq(2).text()); // 2번째 매개변수 그룹명으로 변경 필요
    this.chart.invalidateData();
    this._createScrollbar();
};
GroupGraph.prototype._indexFind = function (i) {
    for( var j = 0; j < this.onIndex.length; j++){
        if(this.onIndex[j] === i ) this.delIndex = j;
    }
};
GroupGraph.prototype._seriesDel = function () {
    this.chart.series.removeIndex(this.delIndex).dispose();
};
GroupGraph.prototype._dataDel = function(i){
    this._initUpdate();
    this.onIndex.splice(i, 1);
    this.selectData=[];
};
GroupGraph.prototype.graphAdd = function (i) {
    this._dataAdd(i);
    this._seriesAdd(i);
    this._createScrollbar();
}
GroupGraph.prototype.graphDel = function (i) {
    this._indexFind(i);
    this._seriesDel();
    this._dataDel(this.delIndex);
    this._extractData();
}
