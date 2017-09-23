var index = new Vue({
	el: ".zui-container",
	data: {
		container:{},
		count:1,
		dropOver:false,
		offsetX:0,
		offsetY:0,
		units: [{
			name: '单元1',
			type: 'rect',
			width: 100,
			height: 50,
			stoken: 'red',
			fill:'red'
		}, {
			name: '单元2',
			type: 'rect',
			width: 100,
			height: 50,
			stoken: 'blue',
			fill:'blue'
		}, {
			name: '单元3',
			type: 'rect',
			width: 100,
			height: 50,
			stoken: 'red',
			fill:'green'
		}, {
			name: '单元4',
			type: 'rect',
			width: 100,
			height: 50,
			stoken: 'red',
			fill:'yellow'
		}]
	},
	mounted: function() {
		this.init();
	},
	methods: {
		init: function() {
			var stage = $("#stage"),
				w = stage.width(),
				h = stage.height();
			stage.width(w + "px");
			stage.height(h + "px");
			this.offsetX = stage.offset().left;
			this.offsetY = stage.offset().top;
			console.log(this.offsetX,this.offsetY);
			this.container = d3.select("#stage").append("svg:svg").attr("width", w).attr("height", h).attr("id",'svgContainer');
		},
		dragElement: function(item) {
			console.log("start"+JSON.stringify(item));
			this.count++;
			item.id = 'unit'+this.count;
			event.dataTransfer.setData("obj", JSON.stringify(item));
		},
		dropElement: function(event){
			var _this = this;
			function dragstarted(d,x,y,z) {
				console.log(d,x,y,z);
			}
		
			function dragged(d,index,obj) {
				if(d3.event.active){
					obj[index].setAttribute('x', d3.event.x);
					obj[index].setAttribute('y', d3.event.y);
				};
				
			}
		
			function dragended(d,index,obj) {
//				console.log(event.pageX-_this.offsetX);
//				obj[index].setAttribute('x', d3.event.x);
//				obj[index].setAttribute('y', d3.event.y);
			}
			var data =JSON.parse(event.dataTransfer.getData("obj"));
			console.log("dropElement"+JSON.stringify(data)+","+(event.pageX-this.offsetX)+","+(event.pageY-this.offsetY));
			data.x = event.pageX-this.offsetX;
			data.y = event.pageY-this.offsetY;
			event.preventDefault();
			var g = d3.select("svg").selectAll('#unit'+data.id)
					.data([data])
					.attr("class", "nodes")
					.enter()
					.append('g');
			g.append("rect")
				.attr("id", function(d){
	                return d.id;  
	            })
				.attr("x", function(d){
	                return d.x;  
	            }).attr("y", function(d){
	                return d.y;  
	            }).attr("width", function(d){
	                return d.width;  
	            }).attr("height", function(d){
	                return d.height;  
	            }).attr("draggable", function(d){
	                return 'true';  
	            }).attr("style", function(d){
	                return 'stoken:'+d.stoken+";stoken-width:"+2+";fill:"+d.fill;  
	            }).on("click", function(obj){
	            		d3.select(this).attr("style", function(d){
		                return 'stoken:'+d.stoken+";stoken-width:"+2+";fill:black";  
		            })
	            })
	            .call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));
            g.append("text").attr("style", function(d){
                return 'stoken:#fff;stoken-width:10';  
            }).attr("x", function(d){
                return d.x;  
            }).attr("y", function(d){
                return d.y;  
            }).text(function(d) { //添加文字描述
		        return d.name;
		    });
            ;
//			var data = event.dataTransfer.getData("data");
//			console.log(data);
//			var pos = {
//				x:e.pageX,
//				y:e.pageY
//			};
//			console.log(pos);
		},
		dragEnterContainer: function(event) {
			this.dropOver = true;
			event.preventDefault();
		},
		dropOverContainer:function(event){
			event.preventDefault();
		},
		dropLeaveContainer:function(event){
			this.dropOver = false;
			event.preventDefault();
		},
		drawUnit:function(){
			
		}
	}
});