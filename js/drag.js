var moduleDrag = (function() {
	// 模块操作类名，标记用
	var CL_MODULE = 'jsDragModule';
	// 状态类名
	var CL_DRAGENTER = 'dragenter';
	var CL_DRAGOVER = 'dragover';
	var CL_DRAGSTART = 'dragstart';

	return {
		el: {},
		store: {},
		events: function() {
			var self = this;
			// 拖拽相关的事件
			var el = self.el;
			// stage
			var stage = el.stage;
			// 拖拽模块
			var modlder = el.modlder;
			// 经过占位模块元素
			modlder.on({
				dragover: function(event) {
					event.preventDefault();
				},
				dragenter: function() {
					stage.addClass(CL_DRAGENTER);
				},
				drop: function(event) {
					
					stage.removeClass(CL_DRAGENTER);
					event.preventDefault();
				}
			});

			// 模块响应左侧的拖拽以及其他模块的拖拽
			var body = el.body;
			// 实时记录鼠标的位置，方便判断鼠标当前在鼠标的上半区还是下半区
			var pos = {};
			document.addEventListener("dragover", function(event) {
				pos.y = event.pageY;
			}, false);

			body.delegate('.' + CL_MODULE, {
				dragover: function(event) {
					event.preventDefault();
				},
				dragenter: function(event) {
					event.preventDefault();
				},
				// 模块间的拖来拖去
				dragstart: function(event) {
					elDrag = $(this).addClass(CL_DRAGSTART);
					// 右侧删除
					el.remove.addClass(CL_DRAGENTER);

					event.originalEvent.dataTransfer.setData('text/plain', 'for firefox');
				},
				dragend: function(event) {
					/*拖拽结束*/
					$(this).removeClass(CL_DRAGSTART);
					elDrag = null;
					// 右侧删除
					el.remove.removeClass(CL_DRAGENTER);
					event.preventDefault();
				}
			});

			// 拖动到删除元素时候
			el.remove.on({
				dragenter: function() {
					$(this).addClass(CL_DRAGOVER);
				},
				dragover: function(event) {
					event.preventDefault();
				},
				dragout: function() {
					$(this).removeClass(CL_DRAGOVER);
				},
				drop: function(event) {

					event.preventDefault();
				}
			});
		},

		insertModule: function(html) {
			return self;
		},

		init: function(modlder,remove,stage) {
			var self = this;
			// 一些元素
			self.el = $.extend(self.el, {
				remove:remove,
				stage:stage,
				modlder:modlder
			});
			self.events();
		}
	};
})();

