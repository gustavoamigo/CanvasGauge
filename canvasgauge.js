var canvasGauge;
(function (canvasGauge) {
    'string mode';
    var CanvasGauge = (function () {
        function CanvasGauge(config) {
            this.config = config;
            this.showOnlyOnce = true;
            var element = document.getElementById(config.id);
            if (element.nodeName != "CANVAS") {
                var canvas = document.createElement("canvas");
                canvas.style.width = element.style.width;
                canvas.style.height = element.style.height;
                canvas.width = element.offsetWidth;
                canvas.height = element.offsetHeight;
                element.appendChild(canvas);
                element = canvas;
            }
            this.context = element.getContext("2d");
            this.setupDefaultValues();
            this.value = config.value;
            this.x = element.width / 2;
            this.y = element.height / 2;
            this.config.innerRadius = this.y - this.config.arcWidth;
            this.config.outerRadius = this.y - 2;
        }
        CanvasGauge.prototype.show = function (value) {
            if (value === void 0) { value = this.value; }
            this.value = value;
            if (this.showOnlyOnce) {
                this.drawArcEdgeLabel();
                this.showOnlyOnce = false;
            }
            this.eraseBackground();
            this.drawMiddleIndicatorLabel();
            this.drawArcIndicator();
            this.drawArcShaddow();
        };
        CanvasGauge.prototype.setupDefaultValues = function () {
            this.config.title = this.config.title || "";
            this.config.value = this.config.value || 0;
            this.config.minValue = this.config.minValue || 0;
            this.config.maxValue = this.config.maxValue || 100;
            this.config.frontColor = this.config.frontColor || "#FF0000";
            this.config.backgroundColor = this.config.backgroundColor || "#EEEEEE";
            this.config.valueFont = this.config.valueFont || "normal normal bold 25px arial";
            this.config.arcWidth = this.config.arcWidth || 30;
            this.config.innerRadius = this.config.innerRadius || 80;
            this.config.outerRadius = this.config.outerRadius || 100;
            this.config.titleFont = this.config.titleFont || "";
            this.config.label = this.config.label || "";
        };
        CanvasGauge.prototype.drawArcEdgeLabel = function () {
            var ctx = this.context, x = this.x, y = this.y, r1 = this.config.innerRadius, r2 = this.config.outerRadius;
            ctx.font = "normal normal normal 11px arial";
            ctx.fillStyle = "#b3b3b3";
            ctx.fillText("0", x - (r2 + r1) / 2 - ctx.measureText("0").width / 2, y + 15);
            ctx.fillText("100", x + (r2 + r1) / 2 - ctx.measureText("100").width / 2, y + 15);
            ctx.fillText(this.config.label, x - ctx.measureText(this.config.label).width / 2, y + 15);
        };
        CanvasGauge.prototype.eraseBackground = function () {
            var ctx = this.context, x = this.x, y = this.y, r2 = this.config.outerRadius;
            ctx.fillStyle = "white";
            ctx.fillRect(x - r2 - 2, y + 2, r2 * 2 + 4, -r2 * 2 - 4);
        };
        CanvasGauge.prototype.drawMiddleIndicatorLabel = function () {
            var ctx = this.context, x = this.x, y = this.y, txt = "" + Math.floor(this.value);
            ctx.font = this.config.valueFont;
            ctx.fillStyle = "black";
            ctx.fillText(txt, x - ctx.measureText(txt).width / 2, y);
        };
        CanvasGauge.prototype.drawArcIndicator = function () {
            var ctx = this.context, x = this.x, y = this.y, r1 = this.config.innerRadius, r2 = this.config.outerRadius;
            ctx.beginPath();
            ctx.fillStyle = this.config.frontColor;
            ctx.strokeStyle = this.config.frontColor;
            var arcAngle = (1 + this.value / 100) * Math.PI;
            var startAngle = 1 * Math.PI;
            ctx.arc(x, y, r1, startAngle, arcAngle);
            ctx.arc(x, y, r2, arcAngle, startAngle, true);
            ctx.arc(x, y, r1, startAngle, startAngle);
            ctx.fill();
            ctx.stroke();
            if (this.value != 100) {
                ctx.beginPath();
                ctx.fillStyle = this.config.backgroundColor;
                ctx.strokeStyle = this.config.backgroundColor;
                var arcAngle = (1 + this.value / 100) * Math.PI;
                var endAngle = 2 * Math.PI;
                ctx.arc(x, y, r1, endAngle, arcAngle, true);
                ctx.arc(x, y, r2, arcAngle, endAngle);
                ctx.arc(x, y, r1, endAngle, endAngle, true);
                ctx.fill();
                ctx.stroke();
            }
        };
        CanvasGauge.prototype.drawArcShaddow = function () {
            var ctx = this.context, x = this.x, y = this.y, r1 = this.config.innerRadius, r2 = this.config.outerRadius, arcAngle = 2 * Math.PI, startAngle = 1 * Math.PI;
            var grd = ctx.createRadialGradient(x, y, r1, x, y, r2);
            grd.addColorStop(0, "rgba(0,0,0,0.09)");
            grd.addColorStop(0.4, "rgba(255,255,255,0)");
            grd.addColorStop(0.6, "rgba(255,255,255,0)");
            grd.addColorStop(1, "rgba(0,0,0,0.09)");
            ctx.beginPath();
            ctx.fillStyle = grd;
            ctx.strokeStyle = "rgba(0,0,0,0.09)";
            ctx.arc(x, y, r1, startAngle, arcAngle);
            ctx.arc(x, y, r2, arcAngle, startAngle, true);
            ctx.arc(x, y, r1, startAngle, startAngle);
            ctx.fill();
            ctx.stroke();
        };
        return CanvasGauge;
    })();
    canvasGauge.CanvasGauge = CanvasGauge;
})(canvasGauge || (canvasGauge = {}));
