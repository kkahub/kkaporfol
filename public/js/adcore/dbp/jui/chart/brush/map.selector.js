jui.define("chart.brush.map.selector", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.over 
     * implements over brush 
     * @extends chart.brush.core
     */
	var MapSelectorBrush = function(chart, axis, brush) {
		var activePath = null;

		this.draw = function() {
			var g = chart.svg.group();

			axis.map.each(function(i, obj) {
				var path = obj.element,
					originFill = path.styles.fill || path.attributes.fill;

				// �� ���� ȿ�� �̺�Ʈ ����
				path.off("mouseover").off("mouseout");

				// �� ���� ȿ�� �̺�Ʈ
				path.hover(function() {
					if(activePath == this) return;

					$(this).css({
						fill: chart.theme("mapSelectorColor")
					});
				}, function() {
					if(activePath == this) return;

					$(this).css({
						fill: originFill
					});
				});

				// �� �н� ��Ƽ�� �̺�Ʈ
				if(brush.activeEvent != null) {
					path.attr({ cursor: "pointer" });

					path.off(brush.activeEvent).on(brush.activeEvent, function () {
						activePath = this;

						axis.map.each(function (i, obj) {
							obj.element.css({
								fill: originFill
							});
						});

						$(this).css({
							fill: chart.theme("mapSelectorActiveColor")
						});
					});
				}
			});

			return g;
		}
	}

	MapSelectorBrush.setup = function() {
		return {
			activeEvent: null
		}
	}

	return MapSelectorBrush;
}, "chart.brush.map.core");
