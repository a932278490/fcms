Namespace = {
    register: function(a) {
        a = a.split(".");
        for (var b = "", c = "", d = a.length, e = 0; e < d; e++) 0 != e && (c += "."), 
        c += a[e], b = e < d - 1 ? b + ("if (typeof(" + c + ") == 'undefined') " + c + " = new Object();") : b + ("delete " + c + ";" + c + " = new Object();");
        "" != b && eval(b);
    }
};

Namespace.register("EBCMS.DATA");

Namespace.register("EBCMS.CORE");

Namespace.register("EBCMS.FN");

Namespace.register("EBCMS.EUI");

Namespace.register("EBCMS.UE");

Namespace.register("EBCMS.ACT");

Namespace.register("EBCMS.MSG");

$(function() {
    EBCMS.CORE = {
        get: function(a) {
            a.queryParams = a.queryParams || {};
            -1 !== $.inArray(a.target, [ "#lgModal .modal-content", "#mdModal .modal-content", "#smModal .modal-content" ]) && (a.queryParams.__modal = 1);
            $.get(a.url, a.queryParams, function(b) {
                b.status ? ("function" == typeof a.loadBefore && a.loadBefore(b, a), EBCMS.CORE.togglemain(a.target), 
                $(a.target).html(b.info), -1 !== $.inArray(a.target, [ "#lgModal .modal-content", "#mdModal .modal-content", "#smModal .modal-content" ]) && $(a.target.substr(0, 8)).modal("toggle"), 
                "function" == typeof a.loadAfter && a.loadAfter(b, a)) : EBCMS.MSG.error(b.info);
            });
        },
        load: function(a) {
            $.post(a.url, a.queryParams || {}, function(b) {
                b.status ? (a.group ? (b.info.groups = EBCMS.FN.group(b.info.rows, a.group), a.tree && $.each(b.info.groups, function(c, d) {
                    b.info.groups[c].rows = EBCMS.FN.array2tree(d.rows, a.rootitem);
                }), a.treelevel && $.each(b.info.groups, function(a, d) {
                    b.info.groups[a].rows = EBCMS.FN.treelevel(d.rows);
                })) : (a.tree ? b.info.rows = EBCMS.FN.array2tree(b.info.rows, a.rootitem) : a.rootitem && b.info.rows.splice(0, 0, {
                    id: "",
                    pid: 0,
                    text: "不限",
                    title: "不限"
                }), a.treelevel && (b.info.rows = EBCMS.FN.treelevel(b.info.rows))), "function" == typeof a.loadAfter ? a.loadAfter(b.info, a) : (a.data = b.info, 
                EBCMS.CORE.compile(a))) : EBCMS.MSG.alert(b.info);
            });
        },
        api: function(a) {
            a.url = EBCMS.DATA.__API_URL;
            a.queryParams = $.extend(!0, {
                __api: "moduledata"
            }, a.queryParams);
            EBCMS.CORE.load(a);
        },
        datadict: function(a) {
            var b = $.extend(!0, {
                __api: "datadict"
            }, a.queryParams);
            $.post(EBCMS.DATA.__API_URL, b, function(b) {
                b.status ? (b.info.rows = EBCMS.FN.datadict2tree(b.info.rows, !1), a.rootitem && b.info.rows.splice(0, 0, {
                    id: "",
                    pid: 0,
                    text: "不限",
                    title: "不限"
                }), "function" == typeof a.loadAfter ? a.loadAfter(b.info) : a.tpl && (a.data = b.info, 
                EBCMS.CORE.compile(a))) : EBCMS.MSG.alert(b.info);
            });
        },
        recommend: function(a, b) {
            EBCMS.CORE.get({
                url: EBCMS.DATA.__URL_RECOMMEND,
                queryParams: {
                    moduletype: a,
                    id: b
                },
                target: "#lgModal .modal-content"
            });
        },
        compile: function(a) {
            a.tpl && (a.result = template(a.tpl, a.data), a.target && ("function" == typeof a.compileBefore && a.compileBefore(a), 
            EBCMS.CORE.togglemain(a.target), $(a.target).html(a.result), -1 !== $.inArray(a.target, [ "#lgModal .modal-content", "#mdModal .modal-content", "#smModal .modal-content" ]) && $(a.target.substr(0, 8)).modal("toggle"), 
            "function" == typeof a.compileAfter && a.compileAfter(a)));
        },
        submit: function(a) {
            var b;
            a.form ? b = $("#" + a.form).serialize() : a.queryParams && (b = a.queryParams);
            $.ajax({
                url: a.url,
                type: "POST",
                dataType: "JSON",
                data: b,
                success: function(b) {
                    b.status ? a.success && a.success(b) : EBCMS.MSG.alert(b.info);
                },
                error: function(a, b, e) {
                    EBCMS.MSG.alert("数据请求失败：" + b + " " + e + "<br />请求地址:" + url + "<br />AJAX请求信息：" + JSON.stringify(this) + '<br /><span style="color:red">如无法解决该问题，请联系EBCMS官方获取帮助</span>');
                }
            });
        },
        togglemain: function(a) {
            var b = $(a).find(".edui-editor-toolbarbox");
            b.size() && $.each(b, function(a, b) {
                UE.getEditor($(b).parent().parent().attr("id")).destroy();
            });
            $(a).show().siblings().hide();
        },
        changemain: function(a, b) {
            EBCMS.CORE.get({
                url: a,
                queryParams: b || {},
                target: "#main"
            });
        }
    };
    EBCMS.FN = {
        str_repeat: function(a, b) {
            for (var c = "", d = 0; d < a; d++) c += b;
            return c;
        },
        in_array: function(a, b) {
            for (var c = 0, d = b.length; c < d; c++) if (a == b[c]) return !0;
            return !1;
        },
        htmlspecialchars: function(a) {
            if (a) return a = a.replace(/&/g, "&amp;"), a = a.replace(/</g, "&lt;"), a = a.replace(/>/g, "&gt;"), 
            a = a.replace(/"/g, "&quot;"), a.replace(/'/g, "&#039;");
        },
        htmlspecialchars_decode: function(a) {
            if (a) return a = a.replace(/&amp;/g, "&"), a = a.replace(/&lt;/g, "<"), a = a.replace(/&gt;/g, ">"), 
            a = a.replace(/&quot;/g, '"'), a.replace(/&#039;/g, "'");
        },
        tabs: function(a, b) {
            $(a).children().bind("click", function(a) {
                $(this).addClass("current").siblings().removeClass("current");
                a = $(this).index();
                $(b).children().eq(a).show().siblings().hide();
            });
            $(a).children().eq(0).trigger("click");
        },
        group: function(a, b) {
            var c = {};
            $.each(a, function(a, e) {
                void 0 == c[e[b]] && (c[e[b]] = {}, c[e[b]].rows = []);
                c[e[b]].rows.push(e);
            });
            return c;
        },
        renderSelect: function(a, b, c, d, e, f, g) {
            e = e || "&nbsp;&nbsp;&nbsp;&nbsp;";
            f = f || "┣";
            g = g || 0;
            c = c || "id";
            d = d || "text";
            var h = "";
            $.each(a, function(a, k) {
                h += '<option value ="' + k[c] + '"';
                k[c] == b && (h += ' selected="selected"');
                h += ">" + EBCMS.FN.str_repeat(g, e) + f + k[d] + "</option>";
                k.rows && "object" == typeof k.rows && (h += EBCMS.FN.renderSelect(k.rows, b, c, d, e, f, g + 1));
            });
            return h;
        },
        renderPage: function(a) {
            var b = "";
            a.filter && $.each(a.filter, function(c, d) {
                if (c) switch (c) {
                  case "lock":
                    b += "<select onchange=\"EBCMS.FN.filterLock('" + a.namespace + "',$(this).val());\">";
                    var e = d.filters || {
                        "已锁": 1,
                        "未锁": 0
                    };
                    b = void 0 == EBCMS[a.namespace].queryParams.__where || void 0 == EBCMS[a.namespace].queryParams.__where.locked ? b + '<option value="ebcms" selected>不限</option>' : b + '<option value="ebcms">不限</option>';
                    $.each(e, function(c, d) {
                        b = EBCMS[a.namespace].queryParams.__where && EBCMS[a.namespace].queryParams.__where.locked && EBCMS[a.namespace].queryParams.__where.locked[1] == d ? b + ('<option value="' + d + '" selected>' + c + "</option>") : b + ('<option value="' + d + '">' + c + "</option>");
                    });
                    b += "</select>";
                    break;

                  case "status":
                    b += "<select onchange=\"EBCMS.FN.filterStatus('" + a.namespace + "',$(this).val());\">";
                    e = d.filters || {
                        "已审": 1,
                        "未审": 0
                    };
                    b = void 0 == EBCMS[a.namespace].queryParams.__where || void 0 == EBCMS[a.namespace].queryParams.__where.locked ? b + '<option value="ebcms" selected>不限</option>' : b + '<option value="ebcms">不限</option>';
                    $.each(e, function(c, d) {
                        b = EBCMS[a.namespace].queryParams.__where && EBCMS[a.namespace].queryParams.__where.status && EBCMS[a.namespace].queryParams.__where.status[1] == d ? b + ('<option value="' + d + '" selected>' + c + "</option>") : b + ('<option value="' + d + '">' + c + "</option>");
                    });
                    b += "</select>";
                    break;

                  case "sort":
                    b += '<select onchange="EBCMS.' + a.namespace + '.refresh({sort:$(this).val(),page:1});">';
                    e = d.filters || {
                        id: "id"
                    };
                    $.each(e, function(c, d) {
                        b = EBCMS[a.namespace].queryParams.sort == c ? b + ('<option value="' + c + '" selected>' + d + "</option>") : b + ('<option value="' + c + '">' + d + "</option>");
                    });
                    b += "</select>";
                    break;

                  case "order":
                    b += '<select onchange="EBCMS.' + a.namespace + '.refresh({order:$(this).val(),page:1});">';
                    e = d.filters || {
                        desc: "从大到小",
                        asc: "从小到大"
                    };
                    $.each(e, function(c, d) {
                        b = EBCMS[a.namespace].queryParams.order == c ? b + ('<option value="' + c + '" selected>' + d + "</option>") : b + ('<option value="' + c + '">' + d + "</option>");
                    });
                    b += "</select>";
                    break;

                  case "rows":
                    b += '<select onchange="EBCMS.' + a.namespace + '.refresh({rows:$(this).val(),page:1});">';
                    e = d.filters || [ "不分页", 2, 10, 20, 30, 40, 50, 100, 200 ];
                    $.each(e, function(c, d) {
                        b = EBCMS[a.namespace].queryParams.rows == d ? b + ('<option value="' + d + '" selected>' + d + "</option>") : b + ('<option value="' + d + '">' + d + "</option>");
                    });
                    b += "</select>";
                    break;

                  default:
                    b += c + "错误！";
                }
            });
            if (0 < EBCMS[a.namespace].queryParams.rows) {
                var c = Math.ceil(a.total / EBCMS[a.namespace].queryParams.rows), d = EBCMS[a.namespace].queryParams.page - 1;
                0 >= d && (d = 1);
                var e = EBCMS[a.namespace].queryParams.page, f = EBCMS[a.namespace].queryParams.page + 1;
                f > c && (f = c || 1);
                b += '<div class="first_page" onclick="EBCMS.' + a.namespace + '.refresh({page:1});">首页</div>';
                b += '<div class="pre_page" onclick="EBCMS.' + a.namespace + ".refresh({page:" + d + '});">上一页</div>';
                b += '<input type="number" value="' + e + '" onkeypress="if(event.keyCode==13) {var page = $(this).val();if(page > ' + c + "){page = " + c + ";}else if(page<1){page=1;};EBCMS." + a.namespace + '.refresh({page:page});return false;}">';
                b += '<div class="next_page" onclick="EBCMS.' + a.namespace + ".refresh({page:" + f + '});">下一页</div>';
                b += '<div class="end_page" onclick="EBCMS.' + a.namespace + ".refresh({page:" + c + '});">末页</div>';
                b += "（共 " + c + " 页，" + a.total + " 条）";
            } else b += "（共 " + a.total + " 条）";
            $("#" + a.namespace + "_page").html(b);
        },
        filterStatus: function(a, b) {
            "ebcms" == b ? (EBCMS[a].queryParams.__where && delete EBCMS[a].queryParams.__where.status, 
            EBCMS[a].refresh({
                page: 1
            })) : EBCMS[a].refresh({
                __where: {
                    status: [ "eq", b ]
                },
                page: 1
            });
        },
        filterLock: function(a, b) {
            "ebcms" == b ? (EBCMS[a].queryParams.__where && delete EBCMS[a].queryParams.__where.locked, 
            EBCMS[a].refresh({
                page: 1
            })) : EBCMS[a].refresh({
                __where: {
                    locked: [ "eq", b ]
                },
                page: 1
            });
        },
        getCheckedId: function(a) {
            var b = [];
            $("#" + a + "_box input[name='id']:checkbox:checked").each(function() {
                b.push($(this).attr("value"));
            });
            return b;
        },
        inverse: function(a) {
            $("#" + a + "_box input[name='id']").each(function() {
                $(this).click();
            });
        },
        getArrayId: function(a) {
            var b = [];
            $.each(a, function(a, d) {
                b.push(d.id);
            });
            return b;
        },
        arrayChecked: function() {
            $.each(data, function(a, b) {
                -1 != $.inArray(b.id, check) ? data[a].checked = !0 : data[a].checked = !1;
            });
            return data;
        },
        deepCopy: function(a) {
            var b = {}, c;
            for (c in a) b[c] = "object" === typeof a[c] ? EBCMS.FN.deepCopy(a[c]) : a[c];
            return b;
        },
        array2tree: function(a, b, c, d, e) {
            c = c || "id";
            d = d || "text";
            e = e || "pid";
            b = Boolean(Number(b));
            var f, g, h = [], l = [], k = a.length;
            f = 0;
            for (g = k; f < g; f++) l[a[f][c]] = a[f];
            f = 0;
            for (g = k; f < g; f++) l[a[f][e]] && a[f][c] != a[f][e] ? (l[a[f][e]].rows || (l[a[f][e]].rows = []), 
            a[f].text = a[f][d], l[a[f][e]].rows.push(a[f])) : (a[f].text = a[f][d], h.push(a[f]));
            return b ? [ {
                id: 0,
                pid: 0,
                text: "根目录",
                title: "根目录",
                level: 0,
                rows: h
            } ] : h;
        },
        treelevel: function(a, b, c, d) {
            d = d || 0;
            b = b || "&nbsp;&nbsp;&nbsp;&nbsp;";
            c = c || "";
            var e = [];
            $.each(a, function(a, g) {
                g.level = d;
                g.levelstr = EBCMS.FN.str_repeat(d, b) + c;
                g.rows && (g.rows = EBCMS.FN.treelevel(g.rows, b, c, d + 1));
                e.push(g);
            });
            return e;
        },
        datadict2tree: function(a, b) {
            b = Boolean(Number(b));
            var c = [], d = EBCMS.FN.deepCopy(a);
            for (key in d) d[d[key].pid] && d[key].id != d[key].pid ? (d[d[key].pid].rows || (d[d[key].pid].rows = []), 
            d[d[key].pid].rows.push(d[key])) : c.push(d[key]);
            return b ? [ {
                id: 0,
                pid: 0,
                text: "根目录",
                level: 0,
                rows: c
            } ] : c;
        },
        unixtostr: function(a) {
            new Date().getTime();
            var b = "";
            a = new Date(1e3 * a);
            var b = a.getHours(), c = a.getMinutes();
            10 > b && (b = "0" + b);
            10 > c && (c = "0" + c);
            return a.getFullYear() + "-" + Number(a.getMonth() + 1) + "-" + a.getDate() + " " + b + ":" + c;
        },
        renderPic: function(a, b, c) {
            c = c || a + "Picker";
            b = WebUploader.create({
                auto: !0,
                swf: EBCMS.DATA.__CONF.WebUploader_swf,
                server: EBCMS.DATA.__CONF.WebUploader_server,
                pick: c,
                fileNumLimit: 1,
                accept: {
                    title: "Images",
                    extensions: b ? b : "gif,jpg,jpeg,bmp,png",
                    mimeTypes: "image/*"
                }
            });
            $(c).mouseover(function() {
                $(this).resize();
            });
            b.on("error", function(a) {
                EBCMS.MSG.webuploaderMsg(a);
            });
            b.on("uploadSuccess", function(b, c) {
                c.status ? $(a).val(c.info.savepath + c.info.savename) : EBCMS.MSG.alert(c.info);
            });
            b.on("uploadError", function(a) {
                EBCMS.MSG.alert("上传出错");
            });
            b.on("uploadComplete", function(a) {});
        },
        renderPics: function(a, b, c) {
            c = c || a + "Picker";
            b = WebUploader.create({
                auto: !0,
                swf: EBCMS.DATA.__CONF.WebUploader_swf,
                server: EBCMS.DATA.__CONF.WebUploader_server,
                pick: c,
                accept: {
                    title: "Images",
                    extensions: b ? b : "gif,jpg,jpeg,bmp,png",
                    mimeTypes: "image/*"
                }
            });
            $(c).mouseover(function() {
                $(this).resize();
            });
            b.on("error", function(a) {
                EBCMS.MSG.webuploaderMsg(a);
            });
            b.on("uploadError", function(a) {
                EBCMS.MSG.alert("上传出错");
            });
            b.on("uploadSuccess", function(b, c) {
                if (c.status) {
                    var f = $(a).val();
                    f ? $(a).val(f + "\r\n" + c.info.savepath + c.info.savename + "|" + c.info.name) : $(a).val(c.info.savepath + c.info.savename + "|" + c.info.name);
                } else EBCMS.MSG.alert(c.info);
            });
            b.on("uploadComplete", function(a) {});
        },
        renderFile: function(a, b, c) {
            c = c || a + "Picker";
            b = WebUploader.create({
                auto: !0,
                swf: EBCMS.DATA.__CONF.WebUploader_swf,
                server: EBCMS.DATA.__CONF.WebUploader_server,
                pick: c,
                fileNumLimit: 1,
                accept: {
                    title: "File",
                    extensions: b ? b : "gif,jpg,jpeg,bmp,png",
                    mimeTypes: "*/*"
                }
            });
            $(c).mouseover(function() {
                $(this).resize();
            });
            b.on("error", function(a) {
                EBCMS.MSG.webuploaderMsg(a);
            });
            b.on("uploadError", function(a) {
                EBCMS.MSG.alert("上传出错");
            });
            b.on("uploadSuccess", function(b, c) {
                c.status ? $(a).val(c.info.savepath + c.info.savename) : EBCMS.MSG.alert(c.info);
            });
            b.on("uploadComplete", function(a) {});
        },
        renderFiles: function(a, b, c) {
            c = c || a + "Picker";
            b = WebUploader.create({
                auto: !0,
                swf: EBCMS.DATA.__CONF.WebUploader_swf,
                server: EBCMS.DATA.__CONF.WebUploader_server,
                pick: c,
                accept: {
                    title: "File",
                    extensions: b ? b : "gif,jpg,jpeg,bmp,png",
                    mimeTypes: "*/*"
                }
            });
            $(c).mouseover(function() {
                $(this).resize();
            });
            b.on("error", function(a) {
                EBCMS.MSG.webuploaderMsg(a);
            });
            b.on("uploadError", function(a) {
                EBCMS.MSG.alert("上传出错");
            });
            b.on("uploadSuccess", function(b, c) {
                if (c.status) {
                    var f = $(a).val();
                    f ? $(a).val(f + "\r\n" + c.info.savepath + c.info.savename + "|" + c.info.md5 + "|" + c.info.size + "|" + c.info.name) : $(a).val(c.info.savepath + c.info.savename + "|" + c.info.md5 + "|" + c.info.size + "|" + c.info.name);
                } else EBCMS.MSG.alert(c.info);
            });
            b.on("uploadComplete", function(a) {});
        },
        renderUE: function(a, b) {
            var c = {
                initialFrameWidth: "100%",
                scaleEnabled: !0
            };
            b && "object" == typeof b && $.extend(c, b);
            UE.getEditor(a, c);
        },
        filterObj: function(a) {
            a = $(a).serializeArray();
            a.length % 2 && a.pop();
            var b = {};
            $.each(a, function(a, d) {
                a % 2 ? d.value ? b[d.name][1] = d.value : delete b[d.name] : (b[d.name] = [], b[d.name][0] = d.value);
            });
            return b;
        },
        checkAccess: function(a, b, c, d) {
            if (EBCMS.DATA.__SUPERADMIN || EBCMS.DATA.__ACCESSLIST[a + "_" + b] && 0 == c) return !0;
            d && EBCMS.MSG.alert("没有权限！");
            return !1;
        }
    };
    EBCMS.ACT = {
        del: function(a, b, c) {
            if (EBCMS.FN.checkAccess(c, "delete", 0)) {
                var d = void 0, d = $.isArray(b) ? b.join() : b;
                if ("" == d) return EBCMS.MSG.alert("请选择要删除的数据！"), !1;
                EBCMS.MSG.confirm("确定将ID为：<br />" + d + "<br />的数据删除？<br/>删除后不可恢复！", function() {
                    EBCMS.CORE.submit({
                        url: a,
                        queryParams: {
                            ids: b
                        },
                        success: function(a) {
                            EBCMS.MSG.tips("删除成功！");
                            EBCMS[c].refresh();
                        }
                    });
                });
            } else EBCMS.MSG.alert("没有权限！");
        },
        dels: function(a, b) {
            var c = EBCMS.FN.getCheckedId(b);
            EBCMS.ACT.del(a, c, b);
        },
        togglefield: function(a, b, c, d, e) {
            if (EBCMS.FN.checkAccess(d, e, 0)) {
                if ("" == b) return EBCMS.MSG.alert("请勾选要操作的数据！"), !1;
                $.ajax({
                    url: a,
                    type: "POST",
                    dataType: "JSON",
                    data: {
                        ids: b,
                        value: c
                    },
                    success: function(a) {
                        a.status ? (EBCMS.MSG.tips("修改成功"), EBCMS[d].refresh()) : EBCMS.MSG.alert(a.info);
                    }
                });
            } else EBCMS.MSG.alert("没有权限！");
        },
        status: function(a, b, c, d) {
            EBCMS.ACT.togglefield(a, b, c, d, "status");
        },
        statuss: function(a, b, c) {
            var d = EBCMS.FN.getCheckedId(c);
            EBCMS.ACT.togglefield(a, d, b, c, "status");
        },
        lock: function(a, b, c, d) {
            EBCMS.ACT.togglefield(a, b, c, d, "lock");
        },
        locks: function(a, b, c) {
            var d = EBCMS.FN.getCheckedId(c);
            EBCMS.ACT.togglefield(a, d, b, c, "lock");
        },
        ajaxPost: function(a) {
            $.ajax({
                url: a.url,
                type: "POST",
                dataType: "JSON",
                data: a.queryParams || {
                    __tmp__: "__tmp__"
                },
                success: function(b) {
                    a.success ? a.success(b) : b.status ? b.info && EBCMS.MSG.tips(b.info) : EBCMS.MSG.alert(b.info);
                },
                error: function(a, c, d) {
                    EBCMS.MSG.alert("数据请求失败：" + c + " " + d + "<br />请求地址:" + url + "<br />AJAX请求信息：" + JSON.stringify(this) + '<br /><span style="color:red">如无法解决该问题，请联系EBCMS官方获取帮助</span>');
                }
            });
        },
        formSubmit: function(a, b, c) {
            $.ajax({
                url: a,
                type: "POST",
                dataType: "JSON",
                data: b || {
                    __tmp__: "__tmp__"
                },
                success: function(a) {
                    c && c(a);
                },
                error: function(b, c, f) {
                    EBCMS.MSG.alert("数据请求失败：" + c + " " + f + "<br />请求地址:" + a + "<br />AJAX请求信息：" + JSON.stringify(this) + '<br /><span style="color:red">如无法解决该问题，请联系EBCMS官方获取帮助</span>');
                }
            });
        },
        baidu: function(a) {
            EBCMS.CORE.api({
                queryParams: {
                    __api: "check_baidu",
                    id: a.id,
                    controller: a.controller,
                    action: a.action
                },
                loadAfter: function(b) {
                    EBCMS.MSG.tips(b);
                    EBCMS[a.namespace].refresh();
                }
            });
        }
    };
    EBCMS.MSG = {
        show: function(a, b) {
            art.dialog({
                title: b || "内容",
                time: 0,
                lock: !0,
                fixed: !0,
                background: "#600",
                opacity: .87,
                drag: !1,
                content: a
            });
        },
        success: function(a) {
            art.dialog({
                title: "成功！",
                icon: "succeed",
                time: 1.5,
                content: a
            });
        },
        info: function(a) {
            art.dialog({
                title: "成功！",
                drag: !1,
                icon: "face-smile",
                time: 1.5,
                content: a
            });
        },
        tips: function(a) {
            art.dialog.notice({
                title: "操作提示",
                width: 220,
                content: a,
                icon: "face-smile",
                time: 2
            });
        },
        alert: function(a) {
            art.dialog.alert(a);
        },
        error: function(a) {
            art.dialog({
                title: "错误！",
                lock: !0,
                fixed: !0,
                drag: !1,
                icon: "error",
                background: "#600",
                opacity: .87,
                content: a
            });
        },
        confirm: function(a, b, c) {
            art.dialog.confirm(a, function() {
                "function" == typeof b && b();
            }, function() {
                "function" == typeof c && c();
            });
        },
        webuploaderMsg: function(a) {
            switch (a) {
              case "Q_EXCEED_NUM_LIMIT":
                EBCMS.MSG.alert("文件数量超出限定值！");
                break;

              case "Q_EXCEED_SIZE_LIMIT":
                EBCMS.MSG.alert("文件大小超出限制！");
                break;

              case "Q_TYPE_DENIED":
                EBCMS.MSG.alert("为了保障系统安全，禁止上传该类型的附件！可以压缩成ZIP文件后上传");
                break;

              default:
                EBCMS.MSG.alert("上传文件重复！");
            }
        }
    };
});