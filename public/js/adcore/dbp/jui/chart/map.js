jui.define("chart.map", [ "jquery", "util.base", "util.math", "util.svg" ], function($, _, math, SVG) {
    /**
     * @class chart.grid.core
     * Grid Core 객체
     * @extends chart.draw
     * @abstract
     */
    var Map = function() {
        var self = this;
        var pathURI = null,
            pathGroup = null,
            pathIndex = {},
            pathScale = 1,
            pathX = 0,
            pathY = 0;

        function loadArray(data) {
            var children = [];

            for(var i = 0, len = data.length; i < len; i++) {
                if(_.typeCheck("object", data[i])) {
                    var style = {};

                    if(_.typeCheck("string", data[i].style)) {
                        style = getStyleObj(data[i].style);
                        delete data[i].style;
                    }

                    var elem = SVG.createObject({ type: "path", attr: data[i] });

                    // Set theme styles
                    elem.attr({
                        fill: self.chart.theme("mapPathBackgroundColor"),
                        "fill-opacity": self.chart.theme("mapPathBackgroundOpacity"),
                        stroke: self.chart.theme("mapPathBorderColor"),
                        "stroke-width": self.chart.theme("mapPathBorderWidth"),
                        "stroke-opacity": self.chart.theme("mapPathBorderOpacity")
                    });

                    // Set resource styles
                    elem.css(style);

                    children.push({
                        element: elem,
                        data: data[i]
                    });
                }
            }

            function getStyleObj(str) {
                var style = {},
                    list = str.split(";");

                for(var i = 0; i < list.length; i++) {
                    if(list[i].indexOf(":") != -1) {
                        var obj = list[i].split(":");

                        style[$.trim(obj[0])] = $.trim(obj[1]);
                    }
                }

                return style;
            }

            return children;
        }

        function loadPath(uri) {
            var pathData = [];

            $.ajax({
                url: uri,
                async: false,
                success: function (xml) {
                    var $path = $(xml).find("path"),
                        $style = $(xml).find("style");

                    $path.each(function () {
                        var obj = {};

                        $.each(this.attributes, function () {
                            if (this.specified && isLoadAttribute(this.name)) {
                                obj[this.name] = this.value;
                            }
                        });

                        if (_.typeCheck("string", obj["id"]) && !obj["position"]) {
                            var pos = getPositionInData(obj["id"]);

                            if (pos != null) {
                                obj["x"] = pos.x;
                                obj["y"] = pos.y;
                            }
                        }

                        pathData.push(obj);
                    });

                    $style.each(function () {
                        self.chart.svg.root.element.appendChild(this);
                    });
                }
            });

            function isLoadAttribute(name) {
                return (name == "id" || name == "title" || name == "x" || name == "y" || name == "d" || name == "class" || name == "style");
            }

            return loadArray(pathData);
        }

        function getPositionInData(id) {
            var list = self.axis.data;

            for(var i = 0; i < list.length; i++) {
                var dataId = self.axis.getValue(list[i], "id", null);

                if(dataId == id) {
                    var x = self.axis.getValue(list[i], "x", null),
                        y = self.axis.getValue(list[i], "y", null);

                    if(_.typeCheck("number", x) && _.typeCheck("number", y)) {
                        return {
                            x: x,
                            y: y,
                            data: list[i]
                        }
                    }
                }
            }

            return null;
        }

        function makePathGroup() {
            var group = self.chart.svg.group(),
                list = loadPath(self.map.path);

            for(var i = 0, len = list.length; i < len; i++) {
                var path = list[i].element;
                group.append(path);

                if(path.attr("id")) {
                    pathIndex[path.attr("id")] = list[i];
                }
            }

            return group;
        }

        function getScaleXY() {
            // 현재 스케일에 따른 계산이 필요함
            var w = self.map.width,
                h = self.map.height,
                px = ((w * pathScale) - w) / 2,
                py = ((h * pathScale) - h) / 2;

            return {
                x: px + pathX,
                y: py + pathY
            }
        }

        this.scale = function(id) {
            if(!_.typeCheck("string", id)) return;

            var path = pathIndex[id].element,
                data = pathIndex[id].data,
                x = null,
                y = null,
                pxy = getScaleXY();

            if(_.typeCheck("object", path)) {
                if(path.attr("x") != null)
                    x = parseFloat(path.attr("x"));
                if(path.attr("y") != null)
                    y = parseFloat(path.attr("y"));
            }

            if(x != null) x = (x * pathScale) - pxy.x;
            if(y != null) y = (y * pathScale) - pxy.y;

            return {
                x: x,
                y: y,
                element: path,
                data: data
            }
        }

        this.scale.each = function(callback) {
            var self = this;

            for(var id in pathIndex) {
                callback.apply(self, [ id, pathIndex[id] ]);
            }
        }

        this.scale.size = function() {
            return {
                width: self.map.width,
                height: self.map.height
            }
        }

        this.scale.scale = function(scale) {
            if(!scale || scale < 0) return pathScale;

            pathScale = scale;
            pathGroup.scale(pathScale);
            this.view(pathX, pathY);

            return pathScale;
        }

        this.scale.view = function(x, y) {
            var xy = { x: pathX, y: pathY };

            if(!_.typeCheck("number", x) || !_.typeCheck("number", y))
                return xy;

            pathX = x;
            pathY = y;

            var pxy = getScaleXY();
            pathGroup.translate(-pxy.x, -pxy.y);

            return {
                x: pathX,
                y: pathY
            }
        }

        /**
         * @method drawGrid
         * draw base grid structure
         * @protected
         * @param {chart.builder} chart
         * @param {String} orient
         * @param {String} cls
         * @param {Map} map
         */
        this.draw = function() {
            var root = this.chart.svg.group();

            pathScale = this.map.scale;
            pathX = this.map.viewX;
            pathY = this.map.viewY;

            // pathURI가 다를 경우에만 pathGroup을 생성함
            if(pathURI != this.map.path) {
                pathGroup = makePathGroup();
                pathURI = this.map.path;
            }

            // pathGroup 루트에 추가
            root.append(pathGroup);

            if(this.map.scale != 1) {
                this.scale.scale(pathScale);
            }

            if(this.map.viewX != 0 || this.map.viewY != 0) {
                this.scale.view(pathX, pathY);
            }

            if(this.map.hide) {
                root.attr({ visibility: "hidden" });
            }

            return {
                root: root,
                scale: this.scale
            };
        }

        /**
         * @method drawAfter
         *
         *
         *
         * @param {Object} obj
         * @protected
         */
        this.drawAfter = function(obj) {
            obj.root.attr({ "clip-path": "url(#" + this.axis.get("clipRectId") + ")" });
        }
    }

    Map.setup = function() {
        /** @property {chart.builder} chart */
        /** @property {chart.axis} axis */
        /** @property {Object} map */

        return {
            scale: 1,
            viewX: 0,
            viewY: 0,

            /** @cfg {Boolean} [hide=false] Determines whether to display an applicable grid.  */
            hide: false,
            /** @cfg {String} [map=''] Set a map file's name */
            path: "",
            /** @cfg {Number} [width=-1] Set map's width */
            width: -1,
            /** @cfg {Number} [height=-1] Set map's height */
            height: -1
        };
    }

    return Map;
}, "chart.draw"); 