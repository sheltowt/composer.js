Slick.definePseudo('docheader', function() {
	return this.tagName.match(/^h[23]/i);
});

var app = {
	init_toc: function()
	{
		var doc = document.getElement('.documentation');
		if(!doc) return false;

		var toc = doc.getElement('> .toc');
		if(!toc) return false;

	},

	init_eval: function()
	{
		var doc = document.getElement('.documentation');
		if(!doc) return false;

		var code = doc.getElements('.highlight > pre > code');
		code.forEach(function(el) {
			var hl = el.getParent().getParent();
			var code = el.get('html').replace(/<.*?>/g, '');
			var btn = new Element('input[type=button]').addEvent('click', function() {
				var fn = new Function(code);
				fn();
			}).set('value', 'Try it').inject(hl, 'bottom');
		});
	},

	init_highlight: function()
	{
		var doc = document.getElement('.documentation');
		if(!doc) return false;

		doc.getElements('.highlight pre code').each(function(el) {
			hljs.highlightBlock(el);
		});
	}
};

window.addEvent('domready', function() {
	app.init_toc();
	app.init_eval();
	app.init_highlight();
});
