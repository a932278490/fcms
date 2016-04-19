Namespace = {
	register: function(b) {
		b = b.split(".");
		for (var c = "", a = "", e = b.length, d = 0; d < e; d++) 0 != d && (a += "."), a += b[d], c = d < e - 1 ? c + ("if (typeof(" + a + ") == 'undefined') " + a + " = new Object();") : c + ("delete " + a + ";" + a + " = new Object();");
		"" != c && eval(c)
	}
};
Namespace.register("EBCMS.CONFIG");
Namespace.register("EBCMS.FN");
EBCMS.FN = {
	change_verify: function(b) {
		$("#" + b).attr("src", EBCMS.CONFIG.verify_URL + "#" + Math.random());
		return !1
	}
};