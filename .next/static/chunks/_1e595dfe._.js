(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(param) {
    let { className, variant, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/diagnostic-resume.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagnosticResume",
    ()=>DiagnosticResume
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/RadarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarRadiusAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Radar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
'use client';
;
;
;
;
function DiagnosticResume(param) {
    let { assessment } = param;
    // Dados reais dos scores por seção
    const sections = (assessment.scores || []).map((score)=>{
        var _score_section_title, _score_section, _score_section1;
        return {
            title: ((_score_section = score.section) === null || _score_section === void 0 ? void 0 : (_score_section_title = _score_section.title) === null || _score_section_title === void 0 ? void 0 : _score_section_title.substring(0, 3)) || 'N/A',
            score: score.weightedScore / 20,
            label: ((_score_section1 = score.section) === null || _score_section1 === void 0 ? void 0 : _score_section1.title) || 'Sem título',
            fullScore: score.weightedScore
        };
    });
    const radarData = sections.map((section)=>({
            section: section.title,
            score: section.score
        }));
    // Calcular score geral e nível de maturidade
    const overallScore = assessment.overallScore ? assessment.overallScore / 20 // Converte de 0-100 para 0-5
     : sections.length > 0 ? sections.reduce((sum, s)=>sum + s.score, 0) / sections.length : 0;
    const overallLevel = assessment.overallLevel || Math.ceil(overallScore);
    const levelLabel = [
        '',
        'Inicial',
        'Básico',
        'Intermediário',
        'Avançado',
        'Otimizado'
    ][overallLevel] || 'Inicial';
    // Contagem real de achados
    const findings = assessment.findings || [];
    const nonCompliantCount = findings.filter((f)=>f.severity === 'HIGH').length;
    const opportunityCount = findings.filter((f)=>f.severity === 'MEDIUM' || f.severity === 'LOW').length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        children: assessment.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: "Visão geral do desempenho e pontuação de maturidade."
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[350px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                        width: "100%",
                                        height: "100%",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarChart"], {
                                            data: radarData,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarGrid"], {
                                                    stroke: "#e2e8f0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                                    dataKey: "section",
                                                    tick: {
                                                        fill: '#64748b',
                                                        fontSize: 12
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 55,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarRadiusAxis"], {
                                                    angle: 90,
                                                    domain: [
                                                        0,
                                                        5
                                                    ],
                                                    tick: {
                                                        fill: '#64748b',
                                                        fontSize: 10
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                                    name: "Pontuação",
                                                    dataKey: "score",
                                                    stroke: "#17a2b8",
                                                    fill: "#17a2b8",
                                                    fillOpacity: 0.5,
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "bg-gradient-to-br from-teal-50 to-white border-teal-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "pt-6 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-6xl font-bold text-teal-600 mb-2",
                                            children: overallScore.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-lg font-semibold text-gray-700 mb-1",
                                            children: "Score Geral"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "bg-teal-600 text-white",
                                            children: levelLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-base flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl",
                                                    children: "🔍"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 17
                                                }, this),
                                                "Resumo dos Achados"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-red-500 rounded-full"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                                    lineNumber: 100,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-red-900",
                                                                    children: "Não Conformidades"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                                    lineNumber: 101,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: "bg-red-600 text-white",
                                                            children: nonCompliantCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-yellow-500 rounded-full"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                                    lineNumber: 108,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-yellow-900",
                                                                    children: "Oportunidades"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                                    lineNumber: 109,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: "bg-yellow-600 text-white",
                                                            children: opportunityCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-base flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl",
                                    children: "📊"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                "Progresso e Respostas"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: (()=>{
                            var _assessment_template_sections, _assessment_template, _assessment_answers;
                            const totalQuestions = ((_assessment_template = assessment.template) === null || _assessment_template === void 0 ? void 0 : (_assessment_template_sections = _assessment_template.sections) === null || _assessment_template_sections === void 0 ? void 0 : _assessment_template_sections.reduce((total, section)=>{
                                var _section_questions;
                                return total + (((_section_questions = section.questions) === null || _section_questions === void 0 ? void 0 : _section_questions.length) || 0);
                            }, 0)) || 0;
                            const answeredQuestions = ((_assessment_answers = assessment.answers) === null || _assessment_answers === void 0 ? void 0 : _assessment_answers.length) || 0;
                            const progressPercent = totalQuestions > 0 ? answeredQuestions / totalQuestions * 100 : 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Perguntas Respondidas"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                lineNumber: 139,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold",
                                                children: [
                                                    answeredQuestions,
                                                    " de ",
                                                    totalQuestions
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-gray-200 rounded-full h-3 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-teal-600 h-3 rounded-full transition-all",
                                            style: {
                                                width: "".concat(progressPercent, "%")
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true);
                        })()
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-base",
                            children: "Pontuação por Seção"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: sections.map((section, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-48 font-medium text-sm",
                                            children: section.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full bg-gray-200 rounded-full h-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-teal-600 h-2 rounded-full transition-all",
                                                    style: {
                                                        width: "".concat(section.score / 5 * 100, "%")
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                lineNumber: 165,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-teal-600",
                                                    children: section.score.toFixed(1)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground ml-1",
                                                    children: "/ 5.0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/diagnostic-resume.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = DiagnosticResume;
var _c;
__turbopack_context__.k.register(_c, "DiagnosticResume");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button(param) {
    let { className, variant, size, asChild = false, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/textarea.tsx",
        lineNumber: 11,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Textarea;
Textarea.displayName = "Textarea";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Textarea$React.forwardRef");
__turbopack_context__.k.register(_c1, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/actions/data:ef6830 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7cece1020a4afed8bae8ee3ce53e12985bcbffcb79":"saveAnswer"},"app/actions/assessments.ts",""] */ __turbopack_context__.s([
    "saveAnswer",
    ()=>saveAnswer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var saveAnswer = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7cece1020a4afed8bae8ee3ce53e12985bcbffcb79", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "saveAnswer"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXNzZXNzbWVudHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSdcbmltcG9ydCB7IHJlZGlyZWN0IH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJ1xuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIsIGdldFVzZXJSb2xlLCBpc1BsYXRmb3JtQWRtaW4gfSBmcm9tICdAL2xpYi9hdXRoJ1xuaW1wb3J0IHsgQXNzZXNzbWVudFN0YXR1cyB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQXNzZXNzbWVudChjb21wYW55SWQ6IHN0cmluZywgZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCByb2xlID0gYXdhaXQgZ2V0VXNlclJvbGUodXNlci5pZCwgY29tcGFueUlkKVxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG5cbiAgaWYgKCFpc0FkbWluICYmICFbJ0NPTVBBTllfQURNSU4nLCAnRU5HSU5FRVInXS5pbmNsdWRlcyhyb2xlIHx8ICcnKSkge1xuICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSBjcmlhciBkaWFnbsOzc3RpY29zJyB9XG4gIH1cblxuICBjb25zdCB0aXRsZSA9IGZvcm1EYXRhLmdldCgndGl0bGUnKSBhcyBzdHJpbmdcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBmb3JtRGF0YS5nZXQoJ2Rlc2NyaXB0aW9uJykgYXMgc3RyaW5nXG4gIGNvbnN0IHRlbXBsYXRlSWQgPSBmb3JtRGF0YS5nZXQoJ3RlbXBsYXRlSWQnKSBhcyBzdHJpbmcgfCBudWxsXG5cbiAgaWYgKCF0aXRsZSkge1xuICAgIHJldHVybiB7IGVycm9yOiAnVMOtdHVsbyDDqSBvYnJpZ2F0w7NyaW8nIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgYXNzZXNzbWVudCA9IGF3YWl0IHByaXNtYS5hc3Nlc3NtZW50LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNvbXBhbnlJZCxcbiAgICAgICAgY3JlYXRlZEJ5OiB1c2VyLmlkLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHRlbXBsYXRlSWQ6IHRlbXBsYXRlSWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICBzdGF0dXM6ICdEUkFGVCcsXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL2RpYWdub3N0aWNzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBhc3Nlc3NtZW50SWQ6IGFzc2Vzc21lbnQuaWQgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gY3JpYXIgZGlhZ27Ds3N0aWNvOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBjcmlhciBkaWFnbsOzc3RpY28nIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXNzZXNzbWVudHMoY29tcGFueUlkPzogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGlzQWRtaW4gPSBhd2FpdCBpc1BsYXRmb3JtQWRtaW4odXNlci5pZClcbiAgICBsZXQgYXNzZXNzbWVudHNcblxuICAgIGlmIChpc0FkbWluKSB7XG4gICAgICBhc3Nlc3NtZW50cyA9IGF3YWl0IHByaXNtYS5hc3Nlc3NtZW50LmZpbmRNYW55KHtcbiAgICAgICAgd2hlcmU6IGNvbXBhbnlJZCA/IHsgY29tcGFueUlkIH0gOiB1bmRlZmluZWQsXG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlLFxuICAgICAgICAgIHNjb3JlczogdHJ1ZSxcbiAgICAgICAgICBfY291bnQ6IHtcbiAgICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgICBhbnN3ZXJzOiB0cnVlLFxuICAgICAgICAgICAgICBzY29yZXM6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgY3JlYXRlZEF0OiAnZGVzYydcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICAgIHN0YXR1czogJ0FDVElWRSdcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgY29tcGFueUlkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGNvbXBhbnlJZHMgPSBtZW1iZXJzaGlwcy5tYXAobSA9PiBtLmNvbXBhbnlJZClcblxuICAgICAgaWYgKGNvbXBhbnlJZCAmJiAhY29tcGFueUlkcy5pbmNsdWRlcyhjb21wYW55SWQpKSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSBhY2Vzc2FyIGRpYWduw7NzdGljb3MgZGVzdGEgZW1wcmVzYScgfVxuICAgICAgfVxuXG4gICAgICBhc3Nlc3NtZW50cyA9IGF3YWl0IHByaXNtYS5hc3Nlc3NtZW50LmZpbmRNYW55KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBjb21wYW55SWQ6IGNvbXBhbnlJZCA/IGNvbXBhbnlJZCA6IHsgaW46IGNvbXBhbnlJZHMgfVxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgY29tcGFueTogdHJ1ZSxcbiAgICAgICAgICBzY29yZXM6IHRydWUsXG4gICAgICAgICAgX2NvdW50OiB7XG4gICAgICAgICAgICBzZWxlY3Q6IHtcbiAgICAgICAgICAgICAgYW5zd2VyczogdHJ1ZSxcbiAgICAgICAgICAgICAgc2NvcmVzOiB0cnVlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgIGNyZWF0ZWRBdDogJ2Rlc2MnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgYXNzZXNzbWVudHMgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gYnVzY2FyIGRpYWduw7NzdGljb3M6JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIGJ1c2NhciBkaWFnbsOzc3RpY29zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFzc2Vzc21lbnRCeUlkKGFzc2Vzc21lbnRJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGFzc2Vzc21lbnQgPSBhd2FpdCBwcmlzbWEuYXNzZXNzbWVudC5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBhc3Nlc3NtZW50SWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgY29tcGFueTogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBzZWN0aW9uczoge1xuICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFuc3dlcnM6IHtcbiAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBxdWVzdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIGV2aWRlbmNlczogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2NvcmVzOiB0cnVlLFxuICAgICAgICBmaW5kaW5nczogdHJ1ZSxcbiAgICAgICAgZXZpZGVuY2VzOiB0cnVlLFxuICAgICAgICBhY3Rpb25QbGFuczogdHJ1ZSxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCFhc3Nlc3NtZW50KSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ0RpYWduw7NzdGljbyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3QgbWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIGNvbXBhbnlJZDogYXNzZXNzbWVudC5jb21wYW55SWQsXG4gICAgICAgIHN0YXR1czogJ0FDVElWRSdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCFpc0FkbWluICYmICFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ1NlbSBwZXJtaXNzw6NvIHBhcmEgYWNlc3NhciBlc3RlIGRpYWduw7NzdGljbycgfVxuICAgIH1cblxuICAgIC8vIEJ1c2NhciBpbmZvcm1hw6fDtWVzIGRvIHVzdcOhcmlvIGNyaWFkb3JcbiAgICBsZXQgY3JlYXRlZEJ5VXNlciA9IG51bGxcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBjcmVhdGVDbGllbnQgfSA9IGF3YWl0IGltcG9ydCgnQC9saWIvc3VwYWJhc2Uvc2VydmVyJylcbiAgICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KClcbiAgICAgIGNvbnN0IHsgZGF0YTogdXNlckRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguYWRtaW4uZ2V0VXNlckJ5SWQoYXNzZXNzbWVudC5jcmVhdGVkQnkpXG4gICAgICBjcmVhdGVkQnlVc2VyID0gdXNlckRhdGE/LnVzZXIgPyB7XG4gICAgICAgIGlkOiB1c2VyRGF0YS51c2VyLmlkLFxuICAgICAgICBlbWFpbDogdXNlckRhdGEudXNlci5lbWFpbCB8fCAnRGVzY29uaGVjaWRvJyxcbiAgICAgICAgbmFtZTogdXNlckRhdGEudXNlci51c2VyX21ldGFkYXRhPy5uYW1lIHx8IHVzZXJEYXRhLnVzZXIuZW1haWw/LnNwbGl0KCdAJylbMF0gfHwgJ1VzdcOhcmlvJ1xuICAgICAgfSA6IG51bGxcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgZGFkb3MgZG8gdXN1w6FyaW8gY3JpYWRvcjonLCBlcnJvcilcbiAgICB9XG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBhc3Nlc3NtZW50OiB7IC4uLmFzc2Vzc21lbnQsIGNyZWF0ZWRCeVVzZXIgfSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgZGlhZ27Ds3N0aWNvOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgZGlhZ27Ds3N0aWNvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlbXBsYXRlcygpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0ZW1wbGF0ZXMgPSBhd2FpdCBwcmlzbWEuZGlhZ25vc3RpY1RlbXBsYXRlLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHN0YXR1czogJ1BVQkxJU0hFRCdcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIHNlY3Rpb25zOiB7XG4gICAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgICAgcXVlc3Rpb25zOiB7XG4gICAgICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFwcHJvdmVkOiB0cnVlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6ICdhc2MnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgIG9yZGVyOiAnYXNjJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgY3JlYXRlZEF0OiAnZGVzYydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgdGVtcGxhdGVzIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGJ1c2NhciB0ZW1wbGF0ZXM6JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIGJ1c2NhciB0ZW1wbGF0ZXMnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUFuc3dlcihcbiAgYXNzZXNzbWVudElkOiBzdHJpbmcsIFxuICBxdWVzdGlvbklkOiBzdHJpbmcsIFxuICB2YWx1ZTogbnVtYmVyLFxuICBqdXN0aWZpY2F0aW9uPzogc3RyaW5nLFxuICBldmlkZW5jZVVybHM/OiBzdHJpbmdbXVxuKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGFzc2Vzc21lbnQgPSBhd2FpdCBwcmlzbWEuYXNzZXNzbWVudC5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBhc3Nlc3NtZW50SWQgfVxuICAgIH0pXG5cbiAgICBpZiAoIWFzc2Vzc21lbnQpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRGlhZ27Ds3N0aWNvIG7Do28gZW5jb250cmFkbycgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzQWRtaW4gPSBhd2FpdCBpc1BsYXRmb3JtQWRtaW4odXNlci5pZClcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgY29tcGFueUlkOiBhc3Nlc3NtZW50LmNvbXBhbnlJZCxcbiAgICAgICAgc3RhdHVzOiAnQUNUSVZFJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIWlzQWRtaW4gJiYgIW1lbWJlcnNoaXApIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSBhY2Vzc2FyIGVzdGUgZGlhZ27Ds3N0aWNvJyB9XG4gICAgfVxuXG4gICAgaWYgKGFzc2Vzc21lbnQuc3RhdHVzID09PSAnQ09NUExFVEVEJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdFc3RlIGRpYWduw7NzdGljbyBqw6EgZm9pIGZpbmFsaXphZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBwcmlzbWEuYXNzZXNzbWVudEFuc3dlci51cHNlcnQoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgYXNzZXNzbWVudElkX3F1ZXN0aW9uSWQ6IHtcbiAgICAgICAgICBhc3Nlc3NtZW50SWQsXG4gICAgICAgICAgcXVlc3Rpb25JZCxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNyZWF0ZToge1xuICAgICAgICBhc3Nlc3NtZW50SWQsXG4gICAgICAgIHF1ZXN0aW9uSWQsXG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGp1c3RpZmljYXRpb24sXG4gICAgICAgIGV2aWRlbmNlVXJsczogZXZpZGVuY2VVcmxzIHx8IFtdLFxuICAgICAgfSxcbiAgICAgIHVwZGF0ZToge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICBqdXN0aWZpY2F0aW9uLFxuICAgICAgICBldmlkZW5jZVVybHM6IGV2aWRlbmNlVXJscyB8fCBbXSxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKGFzc2Vzc21lbnQuc3RhdHVzID09PSAnRFJBRlQnKSB7XG4gICAgICBhd2FpdCBwcmlzbWEuYXNzZXNzbWVudC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogYXNzZXNzbWVudElkIH0sXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBzdGF0dXM6ICdJTl9QUk9HUkVTUycsXG4gICAgICAgICAgc3RhcnRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGFuc3dlciB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBzYWx2YXIgcmVzcG9zdGE6JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHNhbHZhciByZXNwb3N0YScgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRBc3Nlc3NtZW50KGFzc2Vzc21lbnRJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGFzc2Vzc21lbnQgPSBhd2FpdCBwcmlzbWEuYXNzZXNzbWVudC5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBhc3Nlc3NtZW50SWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICBzZWN0aW9uczoge1xuICAgICAgICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zOiB7XG4gICAgICAgICAgICAgICAgICB3aGVyZTogeyBhY3RpdmU6IHRydWUgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYW5zd2Vyczoge1xuICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgIHF1ZXN0aW9uOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghYXNzZXNzbWVudCkge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdEaWFnbsOzc3RpY28gbsOjbyBlbmNvbnRyYWRvJyB9XG4gICAgfVxuXG4gICAgaWYgKCFhc3Nlc3NtZW50LnRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ0VzdGUgZGlhZ27Ds3N0aWNvIG7Do28gcG9zc3VpIHVtIHRlbXBsYXRlIGFzc29jaWFkbycgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzQWRtaW4gPSBhd2FpdCBpc1BsYXRmb3JtQWRtaW4odXNlci5pZClcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgY29tcGFueUlkOiBhc3Nlc3NtZW50LmNvbXBhbnlJZCxcbiAgICAgICAgc3RhdHVzOiAnQUNUSVZFJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIWlzQWRtaW4gJiYgIW1lbWJlcnNoaXApIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSBzdWJtZXRlciBlc3RlIGRpYWduw7NzdGljbycgfVxuICAgIH1cblxuICAgIC8vIENhbGN1bGFyIHNjb3JlcyBwb3Igc2XDp8OjbyB1c2FuZG8gbyBub3ZvIHNjaGVtYVxuICAgIGNvbnN0IHRvdGFsUXVlc3Rpb25zID0gYXNzZXNzbWVudC50ZW1wbGF0ZS5zZWN0aW9ucy5yZWR1Y2UoXG4gICAgICAoc3VtLCBzZWN0aW9uKSA9PiBzdW0gKyBzZWN0aW9uLnF1ZXN0aW9ucy5sZW5ndGgsIFxuICAgICAgMFxuICAgIClcbiAgICBcbiAgICBpZiAoYXNzZXNzbWVudC5hbnN3ZXJzLmxlbmd0aCA8IHRvdGFsUXVlc3Rpb25zKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogYFBvciBmYXZvciwgcmVzcG9uZGEgdG9kYXMgYXMgJHt0b3RhbFF1ZXN0aW9uc30gcGVyZ3VudGFzIGFudGVzIGRlIGZpbmFsaXphcmAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNlY3Rpb25TY29yZXM6IHsgc2VjdGlvbklkOiBzdHJpbmc7IHJhd1Njb3JlOiBudW1iZXI7IHdlaWdodGVkU2NvcmU6IG51bWJlcjsgbGV2ZWw6IG51bWJlciB9W10gPSBbXVxuXG4gICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIGFzc2Vzc21lbnQudGVtcGxhdGUuc2VjdGlvbnMpIHtcbiAgICAgIGNvbnN0IHNlY3Rpb25BbnN3ZXJzID0gYXNzZXNzbWVudC5hbnN3ZXJzLmZpbHRlcihcbiAgICAgICAgYSA9PiBzZWN0aW9uLnF1ZXN0aW9ucy5zb21lKHEgPT4gcS5pZCA9PT0gYS5xdWVzdGlvbklkKVxuICAgICAgKVxuXG4gICAgICBpZiAoc2VjdGlvbkFuc3dlcnMubGVuZ3RoID09PSAwKSBjb250aW51ZVxuXG4gICAgICAvLyBDYWxjdWxhciBzY29yZSBwb25kZXJhZG8gZGEgc2XDp8Ojb1xuICAgICAgbGV0IHJhd1Njb3JlID0gMFxuICAgICAgbGV0IHRvdGFsV2VpZ2h0ID0gMFxuXG4gICAgICBmb3IgKGNvbnN0IGFuc3dlciBvZiBzZWN0aW9uQW5zd2Vycykge1xuICAgICAgICBjb25zdCBxdWVzdGlvbiA9IHNlY3Rpb24ucXVlc3Rpb25zLmZpbmQocSA9PiBxLmlkID09PSBhbnN3ZXIucXVlc3Rpb25JZClcbiAgICAgICAgaWYgKCFxdWVzdGlvbikgY29udGludWVcblxuICAgICAgICByYXdTY29yZSArPSBhbnN3ZXIudmFsdWUgKiBxdWVzdGlvbi53ZWlnaHRcbiAgICAgICAgdG90YWxXZWlnaHQgKz0gcXVlc3Rpb24ud2VpZ2h0ICogKHF1ZXN0aW9uLnR5cGUgPT09ICdCT09MRUFOJyA/IDEgOiA1KVxuICAgICAgfVxuXG4gICAgICBjb25zdCB3ZWlnaHRlZFNjb3JlID0gdG90YWxXZWlnaHQgPiAwID8gKHJhd1Njb3JlIC8gdG90YWxXZWlnaHQpICogMTAwIDogMFxuICAgICAgY29uc3QgbGV2ZWwgPSBNYXRoLm1pbig1LCBNYXRoLm1heCgxLCBNYXRoLmNlaWwod2VpZ2h0ZWRTY29yZSAvIDIwKSkpXG5cbiAgICAgIHNlY3Rpb25TY29yZXMucHVzaCh7IHNlY3Rpb25JZDogc2VjdGlvbi5pZCwgcmF3U2NvcmUsIHdlaWdodGVkU2NvcmUsIGxldmVsIH0pXG5cbiAgICAgIGF3YWl0IHByaXNtYS5hc3Nlc3NtZW50U2NvcmUudXBzZXJ0KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBhc3Nlc3NtZW50SWRfc2VjdGlvbklkOiB7XG4gICAgICAgICAgICBhc3Nlc3NtZW50SWQsXG4gICAgICAgICAgICBzZWN0aW9uSWQ6IHNlY3Rpb24uaWQsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGU6IHtcbiAgICAgICAgICBhc3Nlc3NtZW50SWQsXG4gICAgICAgICAgc2VjdGlvbklkOiBzZWN0aW9uLmlkLFxuICAgICAgICAgIHJhd1Njb3JlLFxuICAgICAgICAgIHdlaWdodGVkU2NvcmUsXG4gICAgICAgICAgbGV2ZWwsXG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZToge1xuICAgICAgICAgIHJhd1Njb3JlLFxuICAgICAgICAgIHdlaWdodGVkU2NvcmUsXG4gICAgICAgICAgbGV2ZWwsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXIgb3ZlcmFsbCBzY29yZSAobcOpZGlhIHBvbmRlcmFkYSBkZSB0b2RhcyBhcyBzZcOnw7VlcylcbiAgICBjb25zdCBvdmVyYWxsU2NvcmUgPSBzZWN0aW9uU2NvcmVzLmxlbmd0aCA+IDAgXG4gICAgICA/IHNlY3Rpb25TY29yZXMucmVkdWNlKChzdW0sIHMpID0+IHN1bSArIHMud2VpZ2h0ZWRTY29yZSwgMCkgLyBzZWN0aW9uU2NvcmVzLmxlbmd0aCBcbiAgICAgIDogMFxuICAgIGNvbnN0IG92ZXJhbGxMZXZlbCA9IE1hdGgubWluKDUsIE1hdGgubWF4KDEsIE1hdGguY2VpbChvdmVyYWxsU2NvcmUgLyAyMCkpKVxuXG4gICAgYXdhaXQgcHJpc21hLmFzc2Vzc21lbnQudXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBhc3Nlc3NtZW50SWQgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc3RhdHVzOiAnU0NPUkVEJyxcbiAgICAgICAgc3VibWl0dGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgIHNjb3JlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICBvdmVyYWxsU2NvcmUsXG4gICAgICAgIG92ZXJhbGxMZXZlbCxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gR2VyYXIgYWNoYWRvcyBhdXRvbWF0aWNhbWVudGUgYmFzZWFkb3MgbmFzIHJlc3Bvc3RhcyBuw6NvIGNvbmZvcm1lc1xuICAgIGNvbnN0IHsgZ2VuZXJhdGVGaW5kaW5ncyB9ID0gYXdhaXQgaW1wb3J0KCcuL2ZpbmRpbmdzJylcbiAgICBhd2FpdCBnZW5lcmF0ZUZpbmRpbmdzKGFzc2Vzc21lbnRJZClcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL2RpYWdub3N0aWNzJylcbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9kaWFnbm9zdGljcy8ke2Fzc2Vzc21lbnRJZH1gKVxuICAgIFxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gc3VibWV0ZXIgZGlhZ27Ds3N0aWNvOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBzdWJtZXRlciBkaWFnbsOzc3RpY28nIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQXNzZXNzbWVudChhc3Nlc3NtZW50SWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBhc3Nlc3NtZW50ID0gYXdhaXQgcHJpc21hLmFzc2Vzc21lbnQuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogYXNzZXNzbWVudElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFhc3Nlc3NtZW50KSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ0RpYWduw7NzdGljbyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIGFzc2Vzc21lbnQuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmICFbJ0NPTVBBTllfQURNSU4nLCAnRU5HSU5FRVInXS5pbmNsdWRlcyhyb2xlIHx8ICcnKSkge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGRlbGV0YXIgZXN0ZSBkaWFnbsOzc3RpY28nIH1cbiAgICB9XG5cbiAgICBhd2FpdCBwcmlzbWEuYXNzZXNzbWVudC5kZWxldGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IGFzc2Vzc21lbnRJZCB9XG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL2RpYWdub3N0aWNzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGRlbGV0YXIgZGlhZ27Ds3N0aWNvOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBkZWxldGFyIGRpYWduw7NzdGljbycgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjhSQW9Pc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/actions/data:38015f [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"70c50e028033d974866984044da038ecc93667a943":"uploadEvidence"},"app/actions/evidence.ts",""] */ __turbopack_context__.s([
    "uploadEvidence",
    ()=>uploadEvidence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var uploadEvidence = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("70c50e028033d974866984044da038ecc93667a943", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "uploadEvidence"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZXZpZGVuY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZEV2aWRlbmNlKFxuICBhc3Nlc3NtZW50SWQ6IHN0cmluZyxcbiAgYW5zd2VySWQ6IHN0cmluZyxcbiAgZm9ybURhdGE6IEZvcm1EYXRhXG4pIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKClcbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdOw6NvIGF1dG9yaXphZG8nIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVmVyaWZpY2FyIGF1dG9yaXphw6fDo28gbXVsdGktdGVuYW50XG4gICAgY29uc3QgYXNzZXNzbWVudCA9IGF3YWl0IHByaXNtYS5hc3Nlc3NtZW50LmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IGFzc2Vzc21lbnRJZCB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBhbnN3ZXJzOiB7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IGFuc3dlcklkIH0sXG4gICAgICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIWFzc2Vzc21lbnQpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRGlhZ27Ds3N0aWNvIG7Do28gZW5jb250cmFkbycgfVxuICAgIH1cblxuICAgIGlmIChhc3Nlc3NtZW50LmFuc3dlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ1Jlc3Bvc3RhIG7Do28gZW5jb250cmFkYSBuZXN0ZSBkaWFnbsOzc3RpY28nIH1cbiAgICB9XG5cbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgY29tcGFueUlkOiBhc3Nlc3NtZW50LmNvbXBhbnlJZCxcbiAgICAgICAgc3RhdHVzOiAnQUNUSVZFJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIW1lbWJlcnNoaXApIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSBmYXplciB1cGxvYWQgZGUgZXZpZMOqbmNpYXMgbmVzdGUgZGlhZ27Ds3N0aWNvJyB9XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IGZvcm1EYXRhLmdldCgnZmlsZScpIGFzIEZpbGVcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnTmVuaHVtIGFycXVpdm8gZm9ybmVjaWRvJyB9XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhciB0YW1hbmhvIChtw6F4IDEwTUIpXG4gICAgaWYgKGZpbGUuc2l6ZSA+IDEwICogMTAyNCAqIDEwMjQpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnQXJxdWl2byBtdWl0byBncmFuZGUuIE3DoXhpbW86IDEwTUInIH1cbiAgICB9XG5cbiAgICAvLyBWYWxpZGFyIHRpcG9cbiAgICBjb25zdCBhbGxvd2VkVHlwZXMgPSBbXG4gICAgICAnaW1hZ2UvanBlZycsXG4gICAgICAnaW1hZ2UvcG5nJyxcbiAgICAgICdpbWFnZS9naWYnLFxuICAgICAgJ2ltYWdlL3dlYnAnLFxuICAgICAgJ2FwcGxpY2F0aW9uL3BkZicsXG4gICAgICAnYXBwbGljYXRpb24vbXN3b3JkJyxcbiAgICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCdcbiAgICBdXG4gICAgXG4gICAgaWYgKCFhbGxvd2VkVHlwZXMuaW5jbHVkZXMoZmlsZS50eXBlKSkge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdUaXBvIGRlIGFycXVpdm8gbsOjbyBwZXJtaXRpZG8uIFVzZSBpbWFnZW5zLCBQREYgb3UgZG9jdW1lbnRvcyBPZmZpY2UuJyB9XG4gICAgfVxuXG4gICAgLy8gQ29udmVydGVyIHBhcmEgYmFzZTY0ICh0ZW1wb3LDoXJpbyAtIHBvc3Rlcmlvcm1lbnRlIG1pZ3JhciBwYXJhIFN1cGFiYXNlIFN0b3JhZ2UpXG4gICAgY29uc3QgYnl0ZXMgPSBhd2FpdCBmaWxlLmFycmF5QnVmZmVyKClcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShieXRlcylcbiAgICBjb25zdCBiYXNlNjQgPSBidWZmZXIudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgY29uc3QgZGF0YVVybCA9IGBkYXRhOiR7ZmlsZS50eXBlfTtiYXNlNjQsJHtiYXNlNjR9YFxuXG4gICAgLy8gU2FsdmFyIG5vIGJhbmNvXG4gICAgY29uc3QgZXZpZGVuY2UgPSBhd2FpdCBwcmlzbWEuZXZpZGVuY2UuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgYXNzZXNzbWVudElkLFxuICAgICAgICBhbnN3ZXJJZCxcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgZmlsZVVybDogZGF0YVVybCwgLy8gVGVtcG9yw6FyaW86IHNlcsOhIHN1YnN0aXR1w61kbyBwb3IgVVJMIGRvIFN1cGFiYXNlIFN0b3JhZ2VcbiAgICAgICAgZmlsZVNpemU6IGZpbGUuc2l6ZSxcbiAgICAgICAgbWltZVR5cGU6IGZpbGUudHlwZSxcbiAgICAgICAgdXBsb2FkZWRCeTogdXNlci5pZFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9kaWFnbm9zdGljcy8ke2Fzc2Vzc21lbnRJZH1gKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGV2aWRlbmNlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGZhemVyIHVwbG9hZCBkZSBldmlkw6puY2lhOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBmYXplciB1cGxvYWQgZG8gYXJxdWl2bycgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVFdmlkZW5jZShldmlkZW5jZUlkOiBzdHJpbmcsIGFzc2Vzc21lbnRJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICB0cnkge1xuICAgIC8vIFZlcmlmaWNhciBhdXRvcml6YcOnw6NvIG11bHRpLXRlbmFudCBQUklNRUlST1xuICAgIGNvbnN0IGV2aWRlbmNlID0gYXdhaXQgcHJpc21hLmV2aWRlbmNlLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IGV2aWRlbmNlSWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgYXNzZXNzbWVudDoge1xuICAgICAgICAgIHNlbGVjdDogeyBjb21wYW55SWQ6IHRydWUgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghZXZpZGVuY2UpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRXZpZMOqbmNpYSBuw6NvIGVuY29udHJhZGEnIH1cbiAgICB9XG5cbiAgICAvLyBHYXJhbnRpciBxdWUgbyB1c3XDoXJpbyB0ZW0gbWVtYmVyc2hpcCBhdGl2YSBuYSBlbXByZXNhXG4gICAgY29uc3QgbWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIGNvbXBhbnlJZDogZXZpZGVuY2UuYXNzZXNzbWVudC5jb21wYW55SWQsXG4gICAgICAgIHN0YXR1czogJ0FDVElWRSdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ1NlbSBwZXJtaXNzw6NvIHBhcmEgZXhjbHVpciBlc3RhIGV2aWTDqm5jaWEnIH1cbiAgICB9XG5cbiAgICAvLyBWZXJpZmljYXIgc2UgcG9kZSBkZWxldGFyIChhcGVuYXMgbyBwcsOzcHJpbyB1cGxvYWRlciBvdSBhZG1pbi9lbmdpbmVlcilcbiAgICBpZiAoZXZpZGVuY2UudXBsb2FkZWRCeSAhPT0gdXNlci5pZCkge1xuICAgICAgaWYgKCFbJ0NPTVBBTllfQURNSU4nLCAnRU5HSU5FRVInXS5pbmNsdWRlcyhtZW1iZXJzaGlwLnJvbGUpKSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnQXBlbmFzIGFkbWluaXN0cmFkb3JlcyBvdSBlbmdlbmhlaXJvcyBwb2RlbSBleGNsdWlyIGV2aWTDqm5jaWFzIGRlIG91dHJvcyB1c3XDoXJpb3MnIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTZSBlc3RpdmVyIHVzYW5kbyBTdXBhYmFzZSBTdG9yYWdlLCBkZWxldGFyIGFycXVpdm8gZGUgbMOhIHRhbWLDqW1cblxuICAgIGF3YWl0IHByaXNtYS5ldmlkZW5jZS5kZWxldGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IGV2aWRlbmNlSWQgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9kaWFnbm9zdGljcy8ke2Fzc2Vzc21lbnRJZH1gKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gZXhjbHVpciBldmlkw6puY2lhOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBleGNsdWlyIGV2aWTDqm5jaWEnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RXZpZGVuY2VzQnlBbnN3ZXIoYW5zd2VySWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBWZXJpZmljYXIgYXV0b3JpemHDp8OjbyBtdWx0aS10ZW5hbnRcbiAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBwcmlzbWEuYXNzZXNzbWVudEFuc3dlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBhbnN3ZXJJZCB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBhc3Nlc3NtZW50OiB7XG4gICAgICAgICAgc2VsZWN0OiB7IGNvbXBhbnlJZDogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCFhbnN3ZXIpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnUmVzcG9zdGEgbsOjbyBlbmNvbnRyYWRhJyB9XG4gICAgfVxuXG4gICAgY29uc3QgbWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIGNvbXBhbnlJZDogYW5zd2VyLmFzc2Vzc21lbnQuY29tcGFueUlkLFxuICAgICAgICBzdGF0dXM6ICdBQ1RJVkUnXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghbWVtYmVyc2hpcCkge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIHZpc3VhbGl6YXIgZXZpZMOqbmNpYXMgZGVzdGUgZGlhZ27Ds3N0aWNvJyB9XG4gICAgfVxuXG4gICAgY29uc3QgZXZpZGVuY2VzID0gYXdhaXQgcHJpc21hLmV2aWRlbmNlLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7IGFuc3dlcklkIH0sXG4gICAgICBvcmRlckJ5OiB7IHVwbG9hZGVkQXQ6ICdkZXNjJyB9XG4gICAgfSlcblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGV2aWRlbmNlcyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgZXZpZMOqbmNpYXM6JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIGJ1c2NhciBldmlkw6puY2lhcycgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IitSQU1zQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/actions/data:5bd364 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"600e1abdda01d2473c07bd0ac5290871cf72eb6d5e":"deleteEvidence"},"app/actions/evidence.ts",""] */ __turbopack_context__.s([
    "deleteEvidence",
    ()=>deleteEvidence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var deleteEvidence = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("600e1abdda01d2473c07bd0ac5290871cf72eb6d5e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "deleteEvidence"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZXZpZGVuY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZEV2aWRlbmNlKFxuICBhc3Nlc3NtZW50SWQ6IHN0cmluZyxcbiAgYW5zd2VySWQ6IHN0cmluZyxcbiAgZm9ybURhdGE6IEZvcm1EYXRhXG4pIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKClcbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdOw6NvIGF1dG9yaXphZG8nIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVmVyaWZpY2FyIGF1dG9yaXphw6fDo28gbXVsdGktdGVuYW50XG4gICAgY29uc3QgYXNzZXNzbWVudCA9IGF3YWl0IHByaXNtYS5hc3Nlc3NtZW50LmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IGFzc2Vzc21lbnRJZCB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBhbnN3ZXJzOiB7XG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IGFuc3dlcklkIH0sXG4gICAgICAgICAgc2VsZWN0OiB7IGlkOiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIWFzc2Vzc21lbnQpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRGlhZ27Ds3N0aWNvIG7Do28gZW5jb250cmFkbycgfVxuICAgIH1cblxuICAgIGlmIChhc3Nlc3NtZW50LmFuc3dlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ1Jlc3Bvc3RhIG7Do28gZW5jb250cmFkYSBuZXN0ZSBkaWFnbsOzc3RpY28nIH1cbiAgICB9XG5cbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgY29tcGFueUlkOiBhc3Nlc3NtZW50LmNvbXBhbnlJZCxcbiAgICAgICAgc3RhdHVzOiAnQUNUSVZFJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIW1lbWJlcnNoaXApIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSBmYXplciB1cGxvYWQgZGUgZXZpZMOqbmNpYXMgbmVzdGUgZGlhZ27Ds3N0aWNvJyB9XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IGZvcm1EYXRhLmdldCgnZmlsZScpIGFzIEZpbGVcbiAgICBpZiAoIWZpbGUpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnTmVuaHVtIGFycXVpdm8gZm9ybmVjaWRvJyB9XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhciB0YW1hbmhvIChtw6F4IDEwTUIpXG4gICAgaWYgKGZpbGUuc2l6ZSA+IDEwICogMTAyNCAqIDEwMjQpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnQXJxdWl2byBtdWl0byBncmFuZGUuIE3DoXhpbW86IDEwTUInIH1cbiAgICB9XG5cbiAgICAvLyBWYWxpZGFyIHRpcG9cbiAgICBjb25zdCBhbGxvd2VkVHlwZXMgPSBbXG4gICAgICAnaW1hZ2UvanBlZycsXG4gICAgICAnaW1hZ2UvcG5nJyxcbiAgICAgICdpbWFnZS9naWYnLFxuICAgICAgJ2ltYWdlL3dlYnAnLFxuICAgICAgJ2FwcGxpY2F0aW9uL3BkZicsXG4gICAgICAnYXBwbGljYXRpb24vbXN3b3JkJyxcbiAgICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCdcbiAgICBdXG4gICAgXG4gICAgaWYgKCFhbGxvd2VkVHlwZXMuaW5jbHVkZXMoZmlsZS50eXBlKSkge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdUaXBvIGRlIGFycXVpdm8gbsOjbyBwZXJtaXRpZG8uIFVzZSBpbWFnZW5zLCBQREYgb3UgZG9jdW1lbnRvcyBPZmZpY2UuJyB9XG4gICAgfVxuXG4gICAgLy8gQ29udmVydGVyIHBhcmEgYmFzZTY0ICh0ZW1wb3LDoXJpbyAtIHBvc3Rlcmlvcm1lbnRlIG1pZ3JhciBwYXJhIFN1cGFiYXNlIFN0b3JhZ2UpXG4gICAgY29uc3QgYnl0ZXMgPSBhd2FpdCBmaWxlLmFycmF5QnVmZmVyKClcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShieXRlcylcbiAgICBjb25zdCBiYXNlNjQgPSBidWZmZXIudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgY29uc3QgZGF0YVVybCA9IGBkYXRhOiR7ZmlsZS50eXBlfTtiYXNlNjQsJHtiYXNlNjR9YFxuXG4gICAgLy8gU2FsdmFyIG5vIGJhbmNvXG4gICAgY29uc3QgZXZpZGVuY2UgPSBhd2FpdCBwcmlzbWEuZXZpZGVuY2UuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgYXNzZXNzbWVudElkLFxuICAgICAgICBhbnN3ZXJJZCxcbiAgICAgICAgZmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgZmlsZVVybDogZGF0YVVybCwgLy8gVGVtcG9yw6FyaW86IHNlcsOhIHN1YnN0aXR1w61kbyBwb3IgVVJMIGRvIFN1cGFiYXNlIFN0b3JhZ2VcbiAgICAgICAgZmlsZVNpemU6IGZpbGUuc2l6ZSxcbiAgICAgICAgbWltZVR5cGU6IGZpbGUudHlwZSxcbiAgICAgICAgdXBsb2FkZWRCeTogdXNlci5pZFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9kaWFnbm9zdGljcy8ke2Fzc2Vzc21lbnRJZH1gKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGV2aWRlbmNlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGZhemVyIHVwbG9hZCBkZSBldmlkw6puY2lhOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBmYXplciB1cGxvYWQgZG8gYXJxdWl2bycgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVFdmlkZW5jZShldmlkZW5jZUlkOiBzdHJpbmcsIGFzc2Vzc21lbnRJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICB0cnkge1xuICAgIC8vIFZlcmlmaWNhciBhdXRvcml6YcOnw6NvIG11bHRpLXRlbmFudCBQUklNRUlST1xuICAgIGNvbnN0IGV2aWRlbmNlID0gYXdhaXQgcHJpc21hLmV2aWRlbmNlLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IGV2aWRlbmNlSWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgYXNzZXNzbWVudDoge1xuICAgICAgICAgIHNlbGVjdDogeyBjb21wYW55SWQ6IHRydWUgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghZXZpZGVuY2UpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRXZpZMOqbmNpYSBuw6NvIGVuY29udHJhZGEnIH1cbiAgICB9XG5cbiAgICAvLyBHYXJhbnRpciBxdWUgbyB1c3XDoXJpbyB0ZW0gbWVtYmVyc2hpcCBhdGl2YSBuYSBlbXByZXNhXG4gICAgY29uc3QgbWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIGNvbXBhbnlJZDogZXZpZGVuY2UuYXNzZXNzbWVudC5jb21wYW55SWQsXG4gICAgICAgIHN0YXR1czogJ0FDVElWRSdcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ1NlbSBwZXJtaXNzw6NvIHBhcmEgZXhjbHVpciBlc3RhIGV2aWTDqm5jaWEnIH1cbiAgICB9XG5cbiAgICAvLyBWZXJpZmljYXIgc2UgcG9kZSBkZWxldGFyIChhcGVuYXMgbyBwcsOzcHJpbyB1cGxvYWRlciBvdSBhZG1pbi9lbmdpbmVlcilcbiAgICBpZiAoZXZpZGVuY2UudXBsb2FkZWRCeSAhPT0gdXNlci5pZCkge1xuICAgICAgaWYgKCFbJ0NPTVBBTllfQURNSU4nLCAnRU5HSU5FRVInXS5pbmNsdWRlcyhtZW1iZXJzaGlwLnJvbGUpKSB7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnQXBlbmFzIGFkbWluaXN0cmFkb3JlcyBvdSBlbmdlbmhlaXJvcyBwb2RlbSBleGNsdWlyIGV2aWTDqm5jaWFzIGRlIG91dHJvcyB1c3XDoXJpb3MnIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTZSBlc3RpdmVyIHVzYW5kbyBTdXBhYmFzZSBTdG9yYWdlLCBkZWxldGFyIGFycXVpdm8gZGUgbMOhIHRhbWLDqW1cblxuICAgIGF3YWl0IHByaXNtYS5ldmlkZW5jZS5kZWxldGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IGV2aWRlbmNlSWQgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9kaWFnbm9zdGljcy8ke2Fzc2Vzc21lbnRJZH1gKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gZXhjbHVpciBldmlkw6puY2lhOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBleGNsdWlyIGV2aWTDqm5jaWEnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RXZpZGVuY2VzQnlBbnN3ZXIoYW5zd2VySWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBWZXJpZmljYXIgYXV0b3JpemHDp8OjbyBtdWx0aS10ZW5hbnRcbiAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBwcmlzbWEuYXNzZXNzbWVudEFuc3dlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBhbnN3ZXJJZCB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBhc3Nlc3NtZW50OiB7XG4gICAgICAgICAgc2VsZWN0OiB7IGNvbXBhbnlJZDogdHJ1ZSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCFhbnN3ZXIpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnUmVzcG9zdGEgbsOjbyBlbmNvbnRyYWRhJyB9XG4gICAgfVxuXG4gICAgY29uc3QgbWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgIGNvbXBhbnlJZDogYW5zd2VyLmFzc2Vzc21lbnQuY29tcGFueUlkLFxuICAgICAgICBzdGF0dXM6ICdBQ1RJVkUnXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghbWVtYmVyc2hpcCkge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIHZpc3VhbGl6YXIgZXZpZMOqbmNpYXMgZGVzdGUgZGlhZ27Ds3N0aWNvJyB9XG4gICAgfVxuXG4gICAgY29uc3QgZXZpZGVuY2VzID0gYXdhaXQgcHJpc21hLmV2aWRlbmNlLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7IGFuc3dlcklkIH0sXG4gICAgICBvcmRlckJ5OiB7IHVwbG9hZGVkQXQ6ICdkZXNjJyB9XG4gICAgfSlcblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGV2aWRlbmNlcyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgZXZpZMOqbmNpYXM6JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIGJ1c2NhciBldmlkw6puY2lhcycgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IitSQXNHc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/evidence-upload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EvidenceUpload",
    ()=>EvidenceUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$38015f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:38015f [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$5bd364__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:5bd364 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function EvidenceUpload(param) {
    let { assessmentId, answerId, existingEvidences = [], disabled = false } = param;
    _s();
    const [evidences, setEvidences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(existingEvidences);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const formatFileSize = (bytes)=>{
        if (bytes < 1024) return "".concat(bytes, " B");
        if (bytes < 1024 * 1024) return "".concat((bytes / 1024).toFixed(1), " KB");
        return "".concat((bytes / (1024 * 1024)).toFixed(1), " MB");
    };
    const getFileIcon = (mimeType)=>{
        if (mimeType.startsWith('image/')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                lineNumber: 43,
                columnNumber: 14
            }, this);
        }
        if (mimeType === 'application/pdf') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                lineNumber: 46,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/evidence-upload.tsx",
            lineNumber: 48,
            columnNumber: 12
        }, this);
    };
    const handleFileSelect = async (files)=>{
        if (!files || files.length === 0) return;
        setUploading(true);
        setError('');
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$38015f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["uploadEvidence"])(assessmentId, answerId, formData);
        if (result.error) {
            setError(result.error);
        } else if (result.evidence) {
            setEvidences([
                ...evidences,
                result.evidence
            ]);
        }
        setUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const handleDelete = async (evidenceId)=>{
        if (!confirm('Deseja realmente excluir esta evidência?')) return;
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$5bd364__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteEvidence"])(evidenceId, assessmentId);
        if (result.error) {
            setError(result.error);
        } else {
            setEvidences(evidences.filter((e)=>e.id !== evidenceId));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm font-medium text-gray-700",
                        children: "Evidências (Fotos/Documentos)"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/evidence-upload.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>{
                            var _fileInputRef_current;
                            return (_fileInputRef_current = fileInputRef.current) === null || _fileInputRef_current === void 0 ? void 0 : _fileInputRef_current.click();
                        },
                        disabled: disabled || uploading,
                        className: "gap-2",
                        children: uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-3 w-3 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/evidence-upload.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this),
                                "Enviando..."
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/evidence-upload.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                "Upload"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/evidence-upload.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: "image/*,application/pdf,.doc,.docx,.xls,.xlsx",
                        onChange: (e)=>handleFileSelect(e.target.files),
                        className: "hidden"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/evidence-upload.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-red-600",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, this),
            evidences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: evidences.map((evidence)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-xs",
                        children: [
                            getFileIcon(evidence.mimeType),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium truncate",
                                        children: evidence.fileName
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/evidence-upload.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500",
                                        children: formatFileSize(evidence.fileSize)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/evidence-upload.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this),
                            evidence.mimeType.startsWith('image/') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: evidence.fileUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "text-teal-600 hover:text-teal-700 underline",
                                children: "Ver"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                                lineNumber: 139,
                                columnNumber: 17
                            }, this),
                            !disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleDelete(evidence.id),
                                className: "text-red-600 hover:text-red-700 p-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/evidence-upload.tsx",
                                    lineNumber: 153,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                                lineNumber: 149,
                                columnNumber: 17
                            }, this)
                        ]
                    }, evidence.id, true, {
                        fileName: "[project]/components/dashboard/evidence-upload.tsx",
                        lineNumber: 129,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500",
                children: "Formatos aceitos: Imagens, PDF, Word, Excel (máx. 10MB)"
            }, void 0, false, {
                fileName: "[project]/components/dashboard/evidence-upload.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/evidence-upload.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(EvidenceUpload, "uiizPC2xDYs+H1Bi/UaIlYtniLo=");
_c = EvidenceUpload;
var _c;
__turbopack_context__.k.register(_c, "EvidenceUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/diagnostic-sections.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagnosticSections",
    ()=>DiagnosticSections
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$ef6830__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:ef6830 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$evidence$2d$upload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/evidence-upload.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function DiagnosticSections(param) {
    let { assessment } = param;
    _s();
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DiagnosticSections.useState": ()=>{
            const initial = {};
            assessment.answers.forEach({
                "DiagnosticSections.useState": (answer)=>{
                    initial[answer.questionId] = {
                        value: answer.value,
                        justification: answer.justification || ''
                    };
                }
            }["DiagnosticSections.useState"]);
            return initial;
        }
    }["DiagnosticSections.useState"]);
    const [answerIds, setAnswerIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DiagnosticSections.useState": ()=>{
            const initial = {};
            assessment.answers.forEach({
                "DiagnosticSections.useState": (answer)=>{
                    initial[answer.questionId] = answer.id;
                }
            }["DiagnosticSections.useState"]);
            return initial;
        }
    }["DiagnosticSections.useState"]);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    if (!assessment.template) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                            className: "h-12 w-12 text-muted-foreground mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold",
                            children: "Template não encontrado"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: "Este diagnóstico não possui um template associado."
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                    lineNumber: 87,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this);
    }
    const isReadOnly = assessment.status !== 'IN_PROGRESS' && assessment.status !== 'DRAFT';
    const handleAnswer = async (questionId, value, requiresJustification)=>{
        const currentAnswer = answers[questionId] || {
            value: null,
            justification: ''
        };
        const newErrors = {
            ...errors
        };
        delete newErrors[questionId];
        setErrors(newErrors);
        setAnswers((prev)=>({
                ...prev,
                [questionId]: {
                    ...currentAnswer,
                    value
                }
            }));
        setSaving(questionId);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$ef6830__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveAnswer"])(assessment.id, questionId, value, currentAnswer.justification.trim() || undefined);
        if ('error' in result) {
            setErrors({
                ...errors,
                [questionId]: result.error
            });
        } else if (result.answer) {
            setAnswerIds((prev)=>({
                    ...prev,
                    [questionId]: result.answer.id
                }));
        }
        setSaving(null);
    };
    const handleJustificationChange = (questionId, justification)=>{
        setAnswers((prev)=>({
                ...prev,
                [questionId]: {
                    ...prev[questionId],
                    justification
                }
            }));
        const newErrors = {
            ...errors
        };
        delete newErrors[questionId];
        setErrors(newErrors);
    };
    const handleJustificationSave = async (questionId, value)=>{
        const currentAnswer = answers[questionId];
        if (!currentAnswer || currentAnswer.value === null) {
            setErrors({
                ...errors,
                [questionId]: 'Responda a pergunta primeiro'
            });
            return;
        }
        setSaving(questionId);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$ef6830__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveAnswer"])(assessment.id, questionId, currentAnswer.value, currentAnswer.justification.trim() || undefined);
        if ('error' in result) {
            setErrors({
                ...errors,
                [questionId]: result.error
            });
        } else if (result.answer) {
            setAnswerIds((prev)=>({
                    ...prev,
                    [questionId]: result.answer.id
                }));
        }
        setSaving(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            isReadOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md bg-blue-50 p-4 border border-blue-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                            className: "h-4 w-4 text-blue-600"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                            lineNumber: 179,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-blue-800",
                            children: "Diagnóstico finalizado - Somente leitura"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                    lineNumber: 178,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                lineNumber: 177,
                columnNumber: 9
            }, this),
            assessment.template.sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-base text-gray-900",
                                    children: section.title
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this),
                                section.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-1",
                                    children: section.description
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "space-y-6",
                            children: section.questions.map((question, idx)=>{
                                const localAnswer = answers[question.id];
                                const answerId = answerIds[question.id];
                                const savedAnswer = assessment.answers.find((a)=>a.questionId === question.id);
                                const hasAnswer = localAnswer && localAnswer.value !== null;
                                const hasJustification = (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.justification) && localAnswer.justification.trim().length > 0;
                                const error = errors[question.id];
                                const isSaving = saving === question.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-b border-gray-200 pb-6 last:border-0 last:pb-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-gray-500 mt-1 min-w-[2rem]",
                                                children: [
                                                    idx + 1,
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                lineNumber: 210,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-900",
                                                                children: question.text
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                lineNumber: 215,
                                                                columnNumber: 25
                                                            }, this),
                                                            question.reference && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 mt-1",
                                                                children: [
                                                                    "Referência: ",
                                                                    question.reference
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 27
                                                            }, this),
                                                            (question.requiresJustification || question.requiresEvidence) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-2 mt-2",
                                                                children: [
                                                                    question.requiresJustification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded border border-orange-200",
                                                                        children: "Justificativa obrigatória"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                        lineNumber: 224,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    question.requiresEvidence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200",
                                                                        children: "Evidência obrigatória"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                        lineNumber: 229,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: question.type === 'BOOLEAN' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === 1 ? 'default' : 'outline',
                                                                    size: "sm",
                                                                    onClick: ()=>handleAnswer(question.id, 1, question.requiresJustification),
                                                                    disabled: isReadOnly || isSaving,
                                                                    className: (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === 1 ? 'bg-green-600 hover:bg-green-700' : '',
                                                                    children: [
                                                                        isSaving && (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                            className: "mr-2 h-3 w-3 animate-spin"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                            lineNumber: 248,
                                                                            columnNumber: 33
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "mr-2 h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                            lineNumber: 250,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        "Sim"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    variant: (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === 0 ? 'default' : 'outline',
                                                                    size: "sm",
                                                                    onClick: ()=>handleAnswer(question.id, 0, question.requiresJustification),
                                                                    disabled: isReadOnly || isSaving,
                                                                    className: (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === 0 ? 'bg-red-600 hover:bg-red-700' : '',
                                                                    children: [
                                                                        isSaving && (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                            className: "mr-2 h-3 w-3 animate-spin"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                            lineNumber: 262,
                                                                            columnNumber: 33
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            className: "mr-2 h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                            lineNumber: 264,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        "Não"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                    lineNumber: 254,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                [
                                                                    1,
                                                                    2,
                                                                    3,
                                                                    4,
                                                                    5
                                                                ].map((score)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === score ? 'default' : 'outline',
                                                                        size: "sm",
                                                                        onClick: ()=>handleAnswer(question.id, score, question.requiresJustification),
                                                                        disabled: isReadOnly || isSaving,
                                                                        className: (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === score ? 'bg-teal-600 hover:bg-teal-700' : '',
                                                                        children: [
                                                                            isSaving && (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) === score && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                                className: "mr-1 h-3 w-3 animate-spin"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                                lineNumber: 281,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            score
                                                                        ]
                                                                    }, score, true, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                        lineNumber: 272,
                                                                        columnNumber: 31
                                                                    }, this)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-gray-500 self-center ml-2",
                                                                    children: "(1=Muito Baixo, 5=Excelente)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 23
                                                    }, this),
                                                    question.requiresJustification && hasAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "justification-".concat(question.id),
                                                                className: "text-sm font-medium text-orange-700",
                                                                children: "Justificativa obrigatória *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                id: "justification-".concat(question.id),
                                                                value: (localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.justification) || '',
                                                                onChange: (e)=>handleJustificationChange(question.id, e.target.value),
                                                                placeholder: "Descreva a justificativa para esta resposta...",
                                                                className: "min-h-[80px] text-sm",
                                                                disabled: isReadOnly
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                lineNumber: 298,
                                                                columnNumber: 27
                                                            }, this),
                                                            !isReadOnly && hasJustification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                variant: "outline",
                                                                onClick: ()=>(localAnswer === null || localAnswer === void 0 ? void 0 : localAnswer.value) !== null && handleJustificationSave(question.id, localAnswer.value),
                                                                disabled: isSaving,
                                                                children: isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                            className: "mr-2 h-3 w-3 animate-spin"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                            lineNumber: 315,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        "Salvando..."
                                                                    ]
                                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "mr-2 h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                            lineNumber: 320,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        "Salvar Justificativa"
                                                                    ]
                                                                }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                lineNumber: 307,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 25
                                                    }, this),
                                                    question.requiresEvidence && hasAnswer && answerId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-2 border-t border-gray-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$evidence$2d$upload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EvidenceUpload"], {
                                                            assessmentId: assessment.id,
                                                            answerId: answerId,
                                                            existingEvidences: (savedAnswer === null || savedAnswer === void 0 ? void 0 : savedAnswer.evidences) || [],
                                                            disabled: isReadOnly
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                            lineNumber: 331,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 25
                                                    }, this),
                                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-red-600 flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                className: "h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 27
                                                            }, this),
                                                            error
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                                lineNumber: 213,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                        lineNumber: 209,
                                        columnNumber: 19
                                    }, this)
                                }, question.id, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this)
                    ]
                }, section.id, true, {
                    fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/diagnostic-sections.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s(DiagnosticSections, "kUU75x299WDNXbUA+9O53u16WT4=");
_c = DiagnosticSections;
var _c;
__turbopack_context__.k.register(_c, "DiagnosticSections");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/diagnostic-findings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagnosticFindings",
    ()=>DiagnosticFindings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
'use client';
;
;
;
;
const severityConfig = {
    HIGH: {
        label: 'Alta',
        className: 'bg-red-100 text-red-800 border-red-200',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"],
        iconColor: 'text-red-600'
    },
    MEDIUM: {
        label: 'Média',
        className: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
        iconColor: 'text-orange-600'
    },
    LOW: {
        label: 'Baixa',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
        iconColor: 'text-yellow-600'
    }
};
function DiagnosticFindings(param) {
    let { assessment } = param;
    const findings = assessment.findings || [];
    const findingsBySection = findings.reduce((acc, finding)=>{
        if (!acc[finding.sectionTitle]) {
            acc[finding.sectionTitle] = [];
        }
        acc[finding.sectionTitle].push(finding);
        return acc;
    }, {});
    const stats = {
        high: findings.filter((f)=>f.severity === 'HIGH').length,
        medium: findings.filter((f)=>f.severity === 'MEDIUM').length,
        low: findings.filter((f)=>f.severity === 'LOW').length,
        total: findings.length
    };
    if (findings.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "h-12 w-12 text-green-600 mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-gray-900",
                            children: "Nenhum achado identificado"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground max-w-md mx-auto",
                            children: "Todas as respostas estão conformes. O diagnóstico não identificou não conformidades."
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-base",
                            children: "Resumo de Achados"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-4 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-gray-900",
                                            children: stats.total
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-600",
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-red-600",
                                            children: stats.high
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-600",
                                            children: "Alta"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-orange-600",
                                            children: stats.medium
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-600",
                                            children: "Média"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-yellow-600",
                                            children: stats.low
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-gray-600",
                                            children: "Baixa"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            Object.entries(findingsBySection).map((param)=>{
                let [sectionTitle, sectionFindings] = param;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "text-base text-gray-900",
                                children: [
                                    sectionTitle,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-sm font-normal text-gray-500",
                                        children: [
                                            "(",
                                            sectionFindings.length,
                                            " ",
                                            sectionFindings.length === 1 ? 'achado' : 'achados',
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "space-y-4",
                            children: sectionFindings.map((finding)=>{
                                const config = severityConfig[finding.severity];
                                const Icon = config.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-md border p-4 ".concat(config.className),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "h-5 w-5 mt-0.5 ".concat(config.iconColor)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                lineNumber: 136,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-gray-900",
                                                                children: finding.questionText
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "outline",
                                                                className: "text-xs whitespace-nowrap",
                                                                children: [
                                                                    "Severidade: ",
                                                                    config.label
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1 text-xs text-gray-700",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Resposta:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 149,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    finding.questionType === 'BOOLEAN' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-red-700",
                                                                        children: "Não"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 151,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-red-700",
                                                                        children: [
                                                                            finding.value,
                                                                            "/5"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 155,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                lineNumber: 148,
                                                                columnNumber: 25
                                                            }, this),
                                                            finding.reference && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Referência:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 163,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: finding.reference
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 164,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 27
                                                            }, this),
                                                            finding.justification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-2 mt-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Justificativa:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "italic",
                                                                        children: finding.justification
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 171,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                lineNumber: 169,
                                                                columnNumber: 27
                                                            }, this),
                                                            finding.evidenceCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mt-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                        className: "h-3 w-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 177,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            finding.evidenceCount,
                                                                            " evidência(s) anexada(s)"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                        lineNumber: 178,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                                lineNumber: 176,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                                lineNumber: 137,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                        lineNumber: 135,
                                        columnNumber: 19
                                    }, this)
                                }, finding.id, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                                    lineNumber: 131,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, sectionTitle, true, {
                    fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/diagnostic-findings.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_c = DiagnosticFindings;
var _c;
__turbopack_context__.k.register(_c, "DiagnosticFindings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/diagnostic-action-plan.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagnosticActionPlan",
    ()=>DiagnosticActionPlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const priorityConfig = {
    HIGH: {
        label: 'Alta',
        className: 'bg-red-100 text-red-800 border-red-200'
    },
    MEDIUM: {
        label: 'Média',
        className: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    LOW: {
        label: 'Baixa',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
};
function DiagnosticActionPlan(param) {
    let { assessment } = param;
    _s();
    const [generating, setGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [report, setReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const canGenerateReport = assessment.status === 'SCORED' && assessment.findings.length > 0;
    // Carregar planos salvos ao montar o componente
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DiagnosticActionPlan.useEffect": ()=>{
            async function loadSavedPlans() {
                try {
                    const { getActionPlans } = await __turbopack_context__.A("[project]/app/actions/action-plans.ts [app-client] (ecmascript, async loader)");
                    const result = await getActionPlans(assessment.id);
                    if ('error' in result) {
                        console.error('Erro ao carregar planos:', result.error);
                        return;
                    }
                    if (result.actionPlans && result.actionPlans.length > 0) {
                        // Reconstituir o report a partir dos planos salvos
                        setReport({
                            executiveSummary: result.executiveSummary || '',
                            actionPlan: result.actionPlans.map({
                                "DiagnosticActionPlan.useEffect.loadSavedPlans": (plan)=>({
                                        title: plan.title,
                                        description: plan.description,
                                        priority: plan.priority,
                                        estimatedDays: plan.dueDate ? Math.ceil((new Date(plan.dueDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000)) : 30,
                                        reference: plan.reference
                                    })
                            }["DiagnosticActionPlan.useEffect.loadSavedPlans"]),
                            metadata: {
                                assessmentId: assessment.id,
                                companyName: '',
                                overallScore: null,
                                overallLevel: null,
                                findingsCount: assessment.findings.length,
                                generatedAt: new Date().toISOString()
                            }
                        });
                    }
                } catch (err) {
                    console.error('Erro ao carregar planos salvos:', err);
                } finally{
                    setLoading(false);
                }
            }
            loadSavedPlans();
        }
    }["DiagnosticActionPlan.useEffect"], [
        assessment.id,
        assessment.findings.length
    ]);
    const handleGenerateReport = async ()=>{
        setGenerating(true);
        setError(null);
        try {
            const response = await fetch('/api/ai/report-writer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    assessmentId: assessment.id
                })
            });
            const data = await response.json();
            if (!response.ok || data.error) {
                throw new Error(data.error || 'Erro ao gerar relatório');
            }
            setReport(data.report);
        } catch (err) {
            console.error('Erro:', err);
            setError(err instanceof Error ? err.message : 'Erro ao gerar relatório via IA');
        } finally{
            setGenerating(false);
        }
    };
    const handleSaveActionPlan = async ()=>{
        if (!report) return;
        setSaving(true);
        setError(null);
        try {
            const { saveActionPlans } = await __turbopack_context__.A("[project]/app/actions/action-plans.ts [app-client] (ecmascript, async loader)");
            const result = await saveActionPlans(assessment.id, report.executiveSummary, report.actionPlan);
            if ('error' in result) {
                throw new Error(result.error);
            }
            alert("".concat(result.count, " ações salvas com sucesso no banco de dados!"));
        } catch (err) {
            console.error('Erro:', err);
            setError(err instanceof Error ? err.message : 'Erro ao salvar plano de ação');
        } finally{
            setSaving(false);
        }
    };
    if (assessment.status !== 'SCORED') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                            className: "h-12 w-12 text-gray-400 mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-gray-900",
                            children: "Diagnóstico não finalizado"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground max-w-md mx-auto",
                            children: "Finalize o diagnóstico e responda todas as perguntas para gerar o plano de ação."
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
            lineNumber: 165,
            columnNumber: 7
        }, this);
    }
    if (assessment.findings.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "h-12 w-12 text-green-600 mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 186,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-gray-900",
                            children: "Nenhuma ação necessária"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground max-w-md mx-auto",
                            children: "O diagnóstico não identificou achados que requerem ações corretivas."
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 190,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                    lineNumber: 185,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
            lineNumber: 183,
            columnNumber: 7
        }, this);
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "h-8 w-8 animate-spin text-gray-400 mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600 mt-3",
                            children: "Carregando plano de ação..."
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                lineNumber: 202,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
            lineNumber: 201,
            columnNumber: 7
        }, this);
    }
    if (!report) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            className: "h-12 w-12 text-teal-600 mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-semibold text-gray-900",
                                    children: "Gerar Plano de Ação com IA"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground mt-2 max-w-md mx-auto",
                                    children: [
                                        "Nossa IA analisará os ",
                                        assessment.findings.length,
                                        " achados identificados e gerará um plano de ação priorizado com recomendações específicas."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleGenerateReport,
                            disabled: generating || !canGenerateReport,
                            className: "bg-teal-600 hover:bg-teal-700",
                            children: generating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "mr-2 h-4 w-4 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                        lineNumber: 234,
                                        columnNumber: 19
                                    }, this),
                                    "Gerando plano de ação..."
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                        lineNumber: 239,
                                        columnNumber: 19
                                    }, this),
                                    "Gerar Plano de Ação com IA"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-red-600 mt-2",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 245,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                    lineNumber: 216,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
            lineNumber: 214,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-teal-200 bg-teal-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-base text-teal-900",
                                    children: "✓ Plano de Ação Gerado pela IA"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "outline",
                                            onClick: ()=>setReport(null),
                                            disabled: saving,
                                            children: "Gerar Novamente"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                            lineNumber: 262,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            onClick: handleSaveActionPlan,
                                            disabled: saving,
                                            className: "bg-teal-600 hover:bg-teal-700",
                                            children: saving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "mr-2 h-3 w-3 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Salvando..."
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                        className: "mr-2 h-3 w-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Salvar Plano"
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                    lineNumber: 261,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 257,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-teal-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        report.actionPlan.length,
                                        " ações"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                    lineNumber: 293,
                                    columnNumber: 13
                                }, this),
                                " recomendadas pela IA"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-base",
                            children: "Resumo Executivo"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 300,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "prose prose-sm max-w-none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700 whitespace-pre-line",
                                children: report.executiveSummary
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold text-gray-900",
                        children: [
                            "Ações Recomendadas (",
                            report.actionPlan.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this),
                    report.actionPlan.map((action, idx)=>{
                        const config = priorityConfig[action.priority];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "hover:shadow-md transition-shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-gray-500",
                                                            children: [
                                                                "#",
                                                                idx + 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: config.className,
                                                            children: [
                                                                "Prioridade: ",
                                                                config.label
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "outline",
                                                            className: "text-xs",
                                                            children: [
                                                                action.estimatedDays,
                                                                " dias"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                            lineNumber: 331,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                    className: "text-base text-gray-900",
                                                    children: action.title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                            lineNumber: 323,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                        lineNumber: 322,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-700",
                                            children: action.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                            lineNumber: 342,
                                            columnNumber: 17
                                        }, this),
                                        action.reference && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: "Referência:"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: action.reference
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                            lineNumber: 346,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                            lineNumber: 320,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md bg-red-50 p-4 border border-red-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-red-800",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                    lineNumber: 359,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
                lineNumber: 358,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/diagnostic-action-plan.tsx",
        lineNumber: 254,
        columnNumber: 5
    }, this);
}
_s(DiagnosticActionPlan, "qU0P7lpan1gM5h4gG1Hd3Xtp5J0=");
_c = DiagnosticActionPlan;
var _c;
__turbopack_context__.k.register(_c, "DiagnosticActionPlan");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/diagnostic-evidence.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagnosticEvidence",
    ()=>DiagnosticEvidence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
'use client';
;
;
;
;
function DiagnosticEvidence(param) {
    let { assessment } = param;
    // Mock evidence data
    const evidences = [
        {
            id: '1',
            fileName: 'ata_reuniao.pdf',
            fileSize: '1.2 MB',
            type: 'application/pdf',
            uploadedBy: 'Mariana Costa',
            uploadedAt: '10/05/2024'
        },
        {
            id: '2',
            fileName: 'politica_sst.pdf',
            fileSize: '800 KB',
            type: 'application/pdf',
            uploadedBy: 'Mariana Costa',
            uploadedAt: '11/05/2024'
        },
        {
            id: '3',
            fileName: 'foto_extintor.jpg',
            fileSize: '2.5 MB',
            type: 'image/jpeg',
            uploadedBy: 'Carlos Silva',
            uploadedAt: '12/05/2024'
        }
    ];
    const getFileIcon = (type)=>{
        if (type.startsWith('image/')) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                className: "h-10 w-10 text-blue-500"
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                lineNumber: 42,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
            className: "h-10 w-10 text-red-500"
        }, void 0, false, {
            fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
            lineNumber: 44,
            columnNumber: 12
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        children: "Galeria de Evidências"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground mt-1",
                                        children: "Todos os arquivos anexados às respostas e achados."
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                className: "gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this),
                                    "Adicionar Evidência"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: evidences.map((evidence)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "hover:shadow-md transition-shadow",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "p-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center text-center space-y-3",
                                        children: [
                                            getFileIcon(evidence.type),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0 w-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium text-sm truncate",
                                                        children: evidence.fileName
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: evidence.fileSize
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground mt-1",
                                                        children: [
                                                            "Anexado em ",
                                                            evidence.uploadedAt,
                                                            " por ",
                                                            evidence.uploadedBy
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                        lineNumber: 74,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                lineNumber: 71,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 w-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        className: "flex-1 gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                className: "h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                                lineNumber: 80,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Ver"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        className: "text-destructive hover:text-destructive",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                                lineNumber: 78,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                        lineNumber: 69,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                    lineNumber: 68,
                                    columnNumber: 17
                                }, this)
                            }, evidence.id, false, {
                                fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/diagnostic-evidence.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c = DiagnosticEvidence;
var _c;
__turbopack_context__.k.register(_c, "DiagnosticEvidence");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/diagnostic-audit.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagnosticAudit",
    ()=>DiagnosticAudit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
'use client';
;
;
function DiagnosticAudit(param) {
    let { assessment } = param;
    // Mock audit log data
    const auditLogs = [
        {
            id: '1',
            user: 'Ana Beatriz',
            action: 'Criou o diagnóstico',
            details: 'Diagnóstico Anual de Maturidade SST 2024',
            timestamp: '01/05/2024 09:00'
        },
        {
            id: '2',
            user: 'Carlos Silva',
            action: 'Respondeu à pergunta',
            details: 'Seção: Governança, Pergunta: q1-1, Resposta: 4',
            timestamp: '10/05/2024 14:20'
        },
        {
            id: '3',
            user: 'Mariana Costa',
            action: 'Adicionou evidência',
            details: 'Pergunta: q1-1, Arquivo: ata_reuniao.pdf',
            timestamp: '10/05/2024 14:22'
        },
        {
            id: '4',
            user: 'IA (Sistema)',
            action: 'Gerou achado (NC)',
            details: 'Achado find-3 gerado para pergunta q5-1.',
            timestamp: '12/05/2024 11:05'
        },
        {
            id: '5',
            user: 'João Pereira',
            action: 'Gerou plano de ação com IA',
            details: 'Plano de ação para 3 achados.',
            timestamp: '15/05/2024 10:00'
        },
        {
            id: '6',
            user: 'João Pereira',
            action: 'Aprovou tarefa do plano',
            details: 'Tarefa: Agendar treinamento da brigada.',
            timestamp: '15/05/2024 10:05'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            children: "Log de Auditoria"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: "Histórico de todas as ações realizadas neste diagnóstico."
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-muted/50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left p-3 text-sm font-medium",
                                                children: "Usuário"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left p-3 text-sm font-medium",
                                                children: "Ação"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                                lineNumber: 71,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left p-3 text-sm font-medium",
                                                children: "Detalhes"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                                lineNumber: 72,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right p-3 text-sm font-medium",
                                                children: "Data"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                                lineNumber: 73,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: auditLogs.map((log)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-border hover:bg-muted/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-3 text-sm font-medium",
                                                    children: log.user
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-3 text-sm",
                                                    children: log.action
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-3 text-sm text-muted-foreground",
                                                    children: log.details
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-3 text-sm text-right text-muted-foreground",
                                                    children: log.timestamp
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, log.id, true, {
                                            fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/diagnostic-audit.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c = DiagnosticAudit;
var _c;
__turbopack_context__.k.register(_c, "DiagnosticAudit");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard/diagnostic-tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagnosticTabs",
    ()=>DiagnosticTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$resume$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-resume.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$sections$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-sections.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$findings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-findings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$action$2d$plan$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-action-plan.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$evidence$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-evidence.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$audit$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-audit.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const tabs = [
    {
        id: 'resumo',
        label: 'Resumo'
    },
    {
        id: 'sections',
        label: 'Seções & Perguntas'
    },
    {
        id: 'achados',
        label: 'Achados'
    },
    {
        id: 'plano',
        label: 'Plano de Ação'
    },
    {
        id: 'evidencias',
        label: 'Evidências'
    },
    {
        id: 'auditoria',
        label: 'Auditoria'
    }
];
const statusConfig = {
    DRAFT: {
        label: 'Rascunho',
        className: 'bg-gray-100 text-gray-800'
    },
    IN_PROGRESS: {
        label: 'Em andamento',
        className: 'bg-blue-100 text-blue-800'
    },
    SUBMITTED: {
        label: 'Submetido',
        className: 'bg-yellow-100 text-yellow-800'
    },
    SCORED: {
        label: 'Pontuado',
        className: 'bg-purple-100 text-purple-800'
    },
    COMPLETED: {
        label: 'Concluído',
        className: 'bg-green-100 text-green-800'
    }
};
function DiagnosticTabs(param) {
    let { assessment } = param;
    var _assessment_createdByUser, _assessment_createdByUser1;
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('resumo');
    const status = statusConfig[assessment.status] || statusConfig.DRAFT;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-8",
                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab(tab.id),
                            className: "pb-4 px-1 border-b-2 font-medium text-sm transition-colors ".concat(activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary hover:border-muted-foreground'),
                            children: tab.label
                        }, tab.id, false, {
                            fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            activeTab === 'resumo' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 lg:grid-cols-4 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "h-5 w-5 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Autor"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: ((_assessment_createdByUser = assessment.createdByUser) === null || _assessment_createdByUser === void 0 ? void 0 : _assessment_createdByUser.name) || ((_assessment_createdByUser1 = assessment.createdByUser) === null || _assessment_createdByUser1 === void 0 ? void 0 : _assessment_createdByUser1.email) || 'Usuário'
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "h-5 w-5 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Criado em"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                                lineNumber: 79,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: new Date(assessment.createdAt).toLocaleDateString('pt-BR')
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                                lineNumber: 80,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "h-5 w-5 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                        lineNumber: 87,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Atualizado em"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: new Date(assessment.updatedAt).toLocaleDateString('pt-BR')
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                                lineNumber: 90,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        className: "h-5 w-5 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                                lineNumber: 99,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: status.className,
                                                children: status.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                        lineNumber: 98,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-[400px]",
                children: [
                    activeTab === 'resumo' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$resume$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosticResume"], {
                        assessment: assessment
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                        lineNumber: 110,
                        columnNumber: 36
                    }, this),
                    activeTab === 'sections' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$sections$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosticSections"], {
                        assessment: assessment
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                        lineNumber: 111,
                        columnNumber: 38
                    }, this),
                    activeTab === 'achados' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$findings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosticFindings"], {
                        assessment: assessment
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                        lineNumber: 112,
                        columnNumber: 37
                    }, this),
                    activeTab === 'plano' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$action$2d$plan$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosticActionPlan"], {
                        assessment: assessment
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                        lineNumber: 113,
                        columnNumber: 35
                    }, this),
                    activeTab === 'evidencias' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$evidence$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosticEvidence"], {
                        assessment: assessment
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                        lineNumber: 114,
                        columnNumber: 40
                    }, this),
                    activeTab === 'auditoria' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$audit$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiagnosticAudit"], {
                        assessment: assessment
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                        lineNumber: 115,
                        columnNumber: 39
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/diagnostic-tabs.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(DiagnosticTabs, "7/ZBC2/gBV3fWtQlgc6LquArep4=");
_c = DiagnosticTabs;
var _c;
__turbopack_context__.k.register(_c, "DiagnosticTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1e595dfe._.js.map