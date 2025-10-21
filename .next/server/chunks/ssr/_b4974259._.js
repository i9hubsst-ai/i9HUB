module.exports = [
"[project]/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
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
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
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
;
}),
"[project]/components/ui/dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function SelectContent({ className, children, position = "popper", align = "center", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            align: align,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 171,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/app/actions/data:2a7390 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"601d6006745c5e3dd8b66f40f4fa5fa7339de71a3a":"inviteUser"},"app/actions/users.ts",""] */ __turbopack_context__.s([
    "inviteUser",
    ()=>inviteUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var inviteUser = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("601d6006745c5e3dd8b66f40f4fa5fa7339de71a3a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "inviteUser"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSdcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyLCBpc1BsYXRmb3JtQWRtaW4sIGdldFVzZXJSb2xlIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IFJvbGUsIE1lbWJlcnNoaXBTdGF0dXMgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0AvbGliL3N1cGFiYXNlL3NlcnZlcidcbmltcG9ydCB7IGNyZWF0ZUFkbWluQ2xpZW50IH0gZnJvbSAnQC9saWIvc3VwYWJhc2UvYWRtaW4nXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnZpdGVVc2VyKGNvbXBhbnlJZDogc3RyaW5nLCBmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKClcbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdOw6NvIGF1dG9yaXphZG8nIH1cbiAgfVxuXG4gIGNvbnN0IGlzQWRtaW4gPSBhd2FpdCBpc1BsYXRmb3JtQWRtaW4odXNlci5pZClcbiAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIGNvbXBhbnlJZClcblxuICBpZiAoIWlzQWRtaW4gJiYgcm9sZSAhPT0gJ0NPTVBBTllfQURNSU4nKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdBcGVuYXMgYWRtaW5pc3RyYWRvcmVzIHBvZGVtIGNvbnZpZGFyIHVzdcOhcmlvcycgfVxuICB9XG5cbiAgY29uc3QgZW1haWwgPSBmb3JtRGF0YS5nZXQoJ2VtYWlsJykgYXMgc3RyaW5nXG4gIGNvbnN0IHVzZXJSb2xlID0gZm9ybURhdGEuZ2V0KCdyb2xlJykgYXMgUm9sZVxuXG4gIGlmICghZW1haWwgfHwgIXVzZXJSb2xlKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFbWFpbCBlIGZ1bsOnw6NvIHPDo28gb2JyaWdhdMOzcmlvcycgfVxuICB9XG5cbiAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvXG4gIGlmICghZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgIHJldHVybiB7IGVycm9yOiAnRW1haWwgaW52w6FsaWRvLiBVc2UgbyBmb3JtYXRvOiB1c3VhcmlvQGVtcHJlc2EuY29tJyB9XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVBZG1pbkNsaWVudCgpXG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBhbHJlYWR5IGV4aXN0cyBpbiBTdXBhYmFzZSBBdXRoXG4gICAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1VzZXJzIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4ubGlzdFVzZXJzKClcbiAgICBsZXQgdGFyZ2V0VXNlciA9IGV4aXN0aW5nVXNlcnM/LnVzZXJzLmZpbmQodSA9PiB1LmVtYWlsPy50b0xvd2VyQ2FzZSgpID09PSBlbWFpbC50b0xvd2VyQ2FzZSgpKVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUncyBhbHJlYWR5IGEgbWVtYmVyc2hpcCBmb3IgdGhpcyBlbWFpbC9jb21wYW55XG4gICAgaWYgKHRhcmdldFVzZXIpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nTWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZF9jb21wYW55SWQ6IHtcbiAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlci5pZCxcbiAgICAgICAgICAgIGNvbXBhbnlJZCxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGlmIChleGlzdGluZ01lbWJlcnNoaXApIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nTWVtYmVyc2hpcC5zdGF0dXMgPT09ICdJTlZJVEVEJykge1xuICAgICAgICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6EgdGVtIHVtIGNvbnZpdGUgcGVuZGVudGUgcGFyYSBlc3RhIGVtcHJlc2EnIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBlcnJvcjogJ0VzdGUgdXN1w6FyaW8gasOhIGVzdMOhIGFzc29jaWFkbyBhIGVzdGEgZW1wcmVzYScgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHVzZXIgZG9lc24ndCBleGlzdCwgaW52aXRlIHRoZW0gdmlhIFN1cGFiYXNlXG4gICAgaWYgKCF0YXJnZXRVc2VyKSB7XG4gICAgICBjb25zdCB7IGRhdGE6IGludml0ZURhdGEsIGVycm9yOiBpbnZpdGVFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmludml0ZVVzZXJCeUVtYWlsKGVtYWlsLCB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpbnZpdGVkX2J5OiB1c2VyLmlkLFxuICAgICAgICAgIGNvbXBhbnlfaWQ6IGNvbXBhbnlJZCxcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKGludml0ZUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gZW52aWFyIGNvbnZpdGUgU3VwYWJhc2U6JywgaW52aXRlRXJyb3IpXG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBlbnZpYXIgY29udml0ZSBwb3IgZW1haWwnIH1cbiAgICAgIH1cblxuICAgICAgdGFyZ2V0VXNlciA9IGludml0ZURhdGEudXNlclxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBtZW1iZXJzaGlwIHdpdGggSU5WSVRFRCBzdGF0dXNcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcklkOiB0YXJnZXRVc2VyLmlkLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIHJvbGU6IHVzZXJSb2xlLFxuICAgICAgICBzdGF0dXM6ICdJTlZJVEVEJyxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY29tcGFuaWVzLyR7Y29tcGFueUlkfWApXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQvdXNlcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lbWJlcnNoaXAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gY29udmlkYXIgdXN1w6FyaW86JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIGNvbnZpZGFyIHVzdcOhcmlvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc2VuZEludml0ZShtZW1iZXJzaGlwSWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBpZiAobWVtYmVyc2hpcC5zdGF0dXMgIT09ICdJTlZJVEVEJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdBcGVuYXMgY29udml0ZXMgcGVuZGVudGVzIHBvZGVtIHNlciByZWVudmlhZG9zJyB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNBZG1pbiA9IGF3YWl0IGlzUGxhdGZvcm1BZG1pbih1c2VyLmlkKVxuICAgIGNvbnN0IHJvbGUgPSBhd2FpdCBnZXRVc2VyUm9sZSh1c2VyLmlkLCBtZW1iZXJzaGlwLmNvbXBhbnlJZClcblxuICAgIGlmICghaXNBZG1pbiAmJiByb2xlICE9PSAnQ09NUEFOWV9BRE1JTicpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSByZWVudmlhciBjb252aXRlcycgfVxuICAgIH1cblxuICAgIC8vIEdldCB1c2VyIGVtYWlsIGZyb20gU3VwYWJhc2VcbiAgICBjb25zdCBzdXBhYmFzZUFkbWluID0gY3JlYXRlQWRtaW5DbGllbnQoKVxuICAgIGNvbnN0IHsgZGF0YTogYXV0aFVzZXIgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5nZXRVc2VyQnlJZChtZW1iZXJzaGlwLnVzZXJJZClcblxuICAgIGlmICghYXV0aFVzZXIudXNlcj8uZW1haWwpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRW1haWwgZG8gdXN1w6FyaW8gbsOjbyBlbmNvbnRyYWRvJyB9XG4gICAgfVxuXG4gICAgLy8gRm9yIHVzZXJzIHdpdGggc3RhdHVzIElOVklURUQgdGhhdCBoYXZlbid0IGNvbmZpcm1lZCB0aGVpciBlbWFpbCB5ZXQsXG4gICAgLy8gd2UgbmVlZCB0byBkZWxldGUgYW5kIHJlY3JlYXRlIHRoZW0gdG8gcmVzZW5kIHRoZSBpbnZpdGUgZW1haWxcbiAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIFN1cGFiYXNlJ3MgaW52aXRlVXNlckJ5RW1haWwgZmFpbHMgd2l0aCBcImVtYWlsX2V4aXN0c1wiIFxuICAgIC8vIGZvciB1c2VycyB0aGF0IGhhdmVuJ3QgY29uZmlybWVkIHlldFxuICAgIFxuICAgIC8vIENoZWNrIGlmIHVzZXIgaGFzIGNvbmZpcm1lZCB0aGVpciBlbWFpbFxuICAgIGlmICghYXV0aFVzZXIudXNlci5lbWFpbF9jb25maXJtZWRfYXQpIHtcbiAgICAgIC8vIFVzZXIgaGFzbid0IGNvbmZpcm1lZCB5ZXQgLSBkZWxldGUgYW5kIHJlY3JlYXRlIHRvIHJlc2VuZCBpbnZpdGVcbiAgICAgIGNvbnN0IHsgZXJyb3I6IGRlbGV0ZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4uZGVsZXRlVXNlcihtZW1iZXJzaGlwLnVzZXJJZClcbiAgICAgIFxuICAgICAgaWYgKGRlbGV0ZUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcHJlcGFyYXIgcmVlbnZpbzonLCBkZWxldGVFcnJvcilcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHByZXBhcmFyIHJlZW52aW8gZGUgY29udml0ZScgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZWNyZWF0ZSB1c2VyIHdpdGggc2FtZSBlbWFpbFxuICAgICAgY29uc3QgeyBkYXRhOiBuZXdVc2VyLCBlcnJvcjogY3JlYXRlRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5pbnZpdGVVc2VyQnlFbWFpbChcbiAgICAgICAgYXV0aFVzZXIudXNlci5lbWFpbCxcbiAgICAgICAge1xuICAgICAgICAgIHJlZGlyZWN0VG86IGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NJVEVfVVJMfS9hdXRoL2NhbGxiYWNrYCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpbnZpdGVkX2J5OiB1c2VyLmlkLFxuICAgICAgICAgICAgY29tcGFueV9pZDogbWVtYmVyc2hpcC5jb21wYW55SWQsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIGlmIChjcmVhdGVFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlZW52aWFyIGNvbnZpdGU6JywgY3JlYXRlRXJyb3IpXG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyByZWVudmlhciBjb252aXRlIHBvciBlbWFpbCcgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgbWVtYmVyc2hpcCB3aXRoIG5ldyB1c2VyIElEXG4gICAgICBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH0sXG4gICAgICAgIGRhdGE6IHsgdXNlcklkOiBuZXdVc2VyLnVzZXIhLmlkIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NvbXBhbmllcy8ke21lbWJlcnNoaXAuY29tcGFueUlkfWApXG4gICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZC91c2VycycpXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgICB9XG5cbiAgICAvLyBVc2VyIGhhcyBjb25maXJtZWQgZW1haWwgLSB0aGV5IHNob3VsZCBsb2dpbiBub3JtYWxseVxuICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6EgY29uZmlybW91IG8gZW1haWwuIEVsZSBkZXZlIGZhemVyIGxvZ2luIG5vcm1hbG1lbnRlLicgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcmVlbnZpYXIgY29udml0ZTonLCBlcnJvcilcbiAgICByZXR1cm4geyBlcnJvcjogJ0Vycm8gYW8gcmVlbnZpYXIgY29udml0ZScgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyUm9sZShtZW1iZXJzaGlwSWQ6IHN0cmluZywgbmV3Um9sZTogUm9sZSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIG1lbWJlcnNoaXAuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmIHJvbGUgIT09ICdDT01QQU5ZX0FETUlOJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGFsdGVyYXIgZnVuw6fDtWVzJyB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH0sXG4gICAgICBkYXRhOiB7IHJvbGU6IG5ld1JvbGUgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9jb21wYW5pZXMvJHttZW1iZXJzaGlwLmNvbXBhbnlJZH1gKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL3VzZXJzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZW1iZXJzaGlwOiB1cGRhdGVkIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGF0dWFsaXphciBmdW7Dp8OjbzonLCBlcnJvcilcbiAgICByZXR1cm4geyBlcnJvcjogJ0Vycm8gYW8gYXR1YWxpemFyIGZ1bsOnw6NvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVVzZXJGcm9tQ29tcGFueShtZW1iZXJzaGlwSWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIG1lbWJlcnNoaXAuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmIHJvbGUgIT09ICdDT01QQU5ZX0FETUlOJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIHJlbW92ZXIgdXN1w6FyaW9zJyB9XG4gICAgfVxuXG4gICAgYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZGVsZXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBtZW1iZXJzaGlwSWQgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9jb21wYW5pZXMvJHttZW1iZXJzaGlwLmNvbXBhbnlJZH1gKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL3VzZXJzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlbW92ZXIgdXN1w6FyaW86JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHJlbW92ZXIgdXN1w6FyaW8nIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcGFueVVzZXJzKGNvbXBhbnlJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gIGNvbnN0IHJvbGUgPSBhd2FpdCBnZXRVc2VyUm9sZSh1c2VyLmlkLCBjb21wYW55SWQpXG5cbiAgaWYgKCFpc0FkbWluICYmICFyb2xlKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGFjZXNzYXIgdXN1w6FyaW9zIGRlc3RhIGVtcHJlc2EnIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyBjb21wYW55SWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgY29tcGFueTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgY3JlYXRlZEF0OiAnZGVzYydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgc3VwYWJhc2VBZG1pbiA9IGNyZWF0ZUFkbWluQ2xpZW50KClcbiAgICBjb25zdCB7IGRhdGE6IGF1dGhVc2VycyB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmxpc3RVc2VycygpXG5cbiAgICBjb25zdCB1c2Vyc1dpdGhEZXRhaWxzID0gbWVtYmVyc2hpcHMubWFwKG1lbWJlcnNoaXAgPT4ge1xuICAgICAgY29uc3QgYXV0aFVzZXIgPSBhdXRoVXNlcnM/LnVzZXJzLmZpbmQodSA9PiB1LmlkID09PSBtZW1iZXJzaGlwLnVzZXJJZClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lbWJlcnNoaXAsXG4gICAgICAgIGVtYWlsOiBhdXRoVXNlcj8uZW1haWwsXG4gICAgICAgIG5hbWU6IGF1dGhVc2VyPy51c2VyX21ldGFkYXRhPy5uYW1lLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnNXaXRoRGV0YWlscyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFVzZXJzKCkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgY29uc3QgaXNBZG1pbiA9IGF3YWl0IGlzUGxhdGZvcm1BZG1pbih1c2VyLmlkKVxuXG4gIHRyeSB7XG4gICAgbGV0IG1lbWJlcnNoaXBzXG5cbiAgICBpZiAoaXNBZG1pbikge1xuICAgICAgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1c2VyTWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICAgIHN0YXR1czogJ0FDVElWRSdcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgY29tcGFueUlkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGNvbXBhbnlJZHMgPSB1c2VyTWVtYmVyc2hpcHMubWFwKG0gPT4gbS5jb21wYW55SWQpXG5cbiAgICAgIG1lbWJlcnNoaXBzID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZE1hbnkoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNvbXBhbnlJZDoge1xuICAgICAgICAgICAgaW46IGNvbXBhbnlJZHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVBZG1pbkNsaWVudCgpXG4gICAgY29uc3QgeyBkYXRhOiBhdXRoVXNlcnMgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5saXN0VXNlcnMoKVxuXG4gICAgLy8gR2V0IGFsbCBwbGF0Zm9ybSBhZG1pbnMgdG8gb3ZlcnJpZGUgdGhlaXIgcm9sZSBkaXNwbGF5XG4gICAgY29uc3QgcGxhdGZvcm1BZG1pbnMgPSBhd2FpdCBwcmlzbWEucGxhdGZvcm1BZG1pbi5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHtcbiAgICAgICAgdXNlcklkOiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgICBjb25zdCBwbGF0Zm9ybUFkbWluSWRzID0gbmV3IFNldChwbGF0Zm9ybUFkbWlucy5tYXAocGEgPT4gcGEudXNlcklkKSlcblxuICAgIGNvbnN0IHVzZXJzV2l0aERldGFpbHMgPSBtZW1iZXJzaGlwcy5tYXAobWVtYmVyc2hpcCA9PiB7XG4gICAgICBjb25zdCBhdXRoVXNlciA9IGF1dGhVc2Vycz8udXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IG1lbWJlcnNoaXAudXNlcklkKVxuICAgICAgXG4gICAgICAvLyBJZiB1c2VyIGlzIGEgcGxhdGZvcm0gYWRtaW4sIG92ZXJyaWRlIHRoZWlyIHJvbGUgZm9yIGRpc3BsYXlcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVJvbGUgPSBwbGF0Zm9ybUFkbWluSWRzLmhhcyhtZW1iZXJzaGlwLnVzZXJJZCkgXG4gICAgICAgID8gJ1BMQVRGT1JNX0FETUlOJyBhcyBSb2xlXG4gICAgICAgIDogbWVtYmVyc2hpcC5yb2xlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lbWJlcnNoaXAsXG4gICAgICAgIHJvbGU6IGVmZmVjdGl2ZVJvbGUsXG4gICAgICAgIGVtYWlsOiBhdXRoVXNlcj8uZW1haWwsXG4gICAgICAgIG5hbWU6IGF1dGhVc2VyPy51c2VyX21ldGFkYXRhPy5uYW1lLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnNXaXRoRGV0YWlscyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VQbGF0Zm9ybUFkbWluKHVzZXJJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gIGlmICghaXNBZG1pbikge1xuICAgIHJldHVybiB7IGVycm9yOiAnQXBlbmFzIGFkbWluaXN0cmFkb3JlcyBkYSBwbGF0YWZvcm1hIHBvZGVtIHByb21vdmVyIHVzdcOhcmlvcycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBhZG1pbiA9IGF3YWl0IHByaXNtYS5wbGF0Zm9ybUFkbWluLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQvdXNlcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGFkbWluIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHByb21vdmVyIHVzdcOhcmlvOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6Egw6kgYWRtaW5pc3RyYWRvciBkYSBwbGF0YWZvcm1hJyB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoid1JBU3NCIn0=
}),
"[project]/components/dashboard/invite-user-dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InviteUserDialog",
    ()=>InviteUserDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$2a7390__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:2a7390 [app-ssr] (ecmascript) <text/javascript>");
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
function InviteUserDialog({ companies }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [companyId, setCompanyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        const formData = new FormData(e.currentTarget);
        formData.set('companyId', companyId);
        formData.set('role', role);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$2a7390__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["inviteUser"])(companyId, formData);
        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            setTimeout(()=>{
                setOpen(false);
                setSuccess(false);
                setCompanyId('');
                setRole('');
                e.currentTarget.reset();
            }, 1500);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: setOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    className: "gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        "Convidar Usuário"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
                className: "sm:max-w-[500px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Convidar Novo Usuário"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                children: "Envie um convite por email para um novo usuário acessar a plataforma"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-4 pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "email",
                                        children: [
                                            "Email do Usuário ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-destructive",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                lineNumber: 88,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "email",
                                        name: "email",
                                        type: "email",
                                        placeholder: "usuario@empresa.com",
                                        required: true,
                                        disabled: loading
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Um email será enviado com instruções para criar a senha"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "companyId",
                                        children: [
                                            "Empresa ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-destructive",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                lineNumber: 105,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        value: companyId,
                                        onValueChange: setCompanyId,
                                        disabled: loading,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Selecione uma empresa"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                lineNumber: 108,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: companies.map((company)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: company.id,
                                                        children: company.name
                                                    }, company.id, false, {
                                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "role",
                                        children: [
                                            "Papel ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-destructive",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                lineNumber: 123,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        value: role,
                                        onValueChange: setRole,
                                        disabled: loading,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Selecione um papel"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                lineNumber: 126,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "COMPANY_ADMIN",
                                                        children: "Administrador da Empresa"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "ENGINEER",
                                                        children: "Engenheiro SST"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "EMPLOYER",
                                                        children: "Funcionário"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "VIEWER",
                                                        children: "Visualizador"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Define as permissões do usuário na empresa"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-destructive/10 text-destructive p-3 rounded-lg text-sm",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-green-100 text-green-700 p-3 rounded-lg text-sm",
                                children: "Usuário adicionado com sucesso!"
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "submit",
                                        disabled: loading || success || !companyId || !role,
                                        className: "flex-1",
                                        children: loading ? 'Adicionando...' : success ? 'Adicionado!' : 'Adicionar Usuário'
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        onClick: ()=>setOpen(false),
                                        disabled: loading,
                                        className: "flex-1",
                                        children: "Cancelar"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard/invite-user-dialog.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/alert-dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialog",
    ()=>AlertDialog,
    "AlertDialogAction",
    ()=>AlertDialogAction,
    "AlertDialogCancel",
    ()=>AlertDialogCancel,
    "AlertDialogContent",
    ()=>AlertDialogContent,
    "AlertDialogDescription",
    ()=>AlertDialogDescription,
    "AlertDialogFooter",
    ()=>AlertDialogFooter,
    "AlertDialogHeader",
    ()=>AlertDialogHeader,
    "AlertDialogOverlay",
    ()=>AlertDialogOverlay,
    "AlertDialogPortal",
    ()=>AlertDialogPortal,
    "AlertDialogTitle",
    ()=>AlertDialogTitle,
    "AlertDialogTrigger",
    ()=>AlertDialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AlertDialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "alert-dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function AlertDialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "alert-dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
function AlertDialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "alert-dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
function AlertDialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "alert-dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function AlertDialogContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogOverlay, {}, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "alert-dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
function AlertDialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
function AlertDialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function AlertDialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "alert-dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
function AlertDialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "alert-dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
function AlertDialogAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buttonVariants"])(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
function AlertDialogCancel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Cancel"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buttonVariants"])({
            variant: "outline"
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert-dialog.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/app/actions/data:8cf5d9 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60a33b8b968fefd2d0391196d3a6e080efbe53a545":"updateUserRole"},"app/actions/users.ts",""] */ __turbopack_context__.s([
    "updateUserRole",
    ()=>updateUserRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var updateUserRole = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("60a33b8b968fefd2d0391196d3a6e080efbe53a545", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateUserRole"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSdcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyLCBpc1BsYXRmb3JtQWRtaW4sIGdldFVzZXJSb2xlIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IFJvbGUsIE1lbWJlcnNoaXBTdGF0dXMgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0AvbGliL3N1cGFiYXNlL3NlcnZlcidcbmltcG9ydCB7IGNyZWF0ZUFkbWluQ2xpZW50IH0gZnJvbSAnQC9saWIvc3VwYWJhc2UvYWRtaW4nXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnZpdGVVc2VyKGNvbXBhbnlJZDogc3RyaW5nLCBmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKClcbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdOw6NvIGF1dG9yaXphZG8nIH1cbiAgfVxuXG4gIGNvbnN0IGlzQWRtaW4gPSBhd2FpdCBpc1BsYXRmb3JtQWRtaW4odXNlci5pZClcbiAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIGNvbXBhbnlJZClcblxuICBpZiAoIWlzQWRtaW4gJiYgcm9sZSAhPT0gJ0NPTVBBTllfQURNSU4nKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdBcGVuYXMgYWRtaW5pc3RyYWRvcmVzIHBvZGVtIGNvbnZpZGFyIHVzdcOhcmlvcycgfVxuICB9XG5cbiAgY29uc3QgZW1haWwgPSBmb3JtRGF0YS5nZXQoJ2VtYWlsJykgYXMgc3RyaW5nXG4gIGNvbnN0IHVzZXJSb2xlID0gZm9ybURhdGEuZ2V0KCdyb2xlJykgYXMgUm9sZVxuXG4gIGlmICghZW1haWwgfHwgIXVzZXJSb2xlKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFbWFpbCBlIGZ1bsOnw6NvIHPDo28gb2JyaWdhdMOzcmlvcycgfVxuICB9XG5cbiAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvXG4gIGlmICghZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgIHJldHVybiB7IGVycm9yOiAnRW1haWwgaW52w6FsaWRvLiBVc2UgbyBmb3JtYXRvOiB1c3VhcmlvQGVtcHJlc2EuY29tJyB9XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVBZG1pbkNsaWVudCgpXG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBhbHJlYWR5IGV4aXN0cyBpbiBTdXBhYmFzZSBBdXRoXG4gICAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1VzZXJzIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4ubGlzdFVzZXJzKClcbiAgICBsZXQgdGFyZ2V0VXNlciA9IGV4aXN0aW5nVXNlcnM/LnVzZXJzLmZpbmQodSA9PiB1LmVtYWlsPy50b0xvd2VyQ2FzZSgpID09PSBlbWFpbC50b0xvd2VyQ2FzZSgpKVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUncyBhbHJlYWR5IGEgbWVtYmVyc2hpcCBmb3IgdGhpcyBlbWFpbC9jb21wYW55XG4gICAgaWYgKHRhcmdldFVzZXIpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nTWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZF9jb21wYW55SWQ6IHtcbiAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlci5pZCxcbiAgICAgICAgICAgIGNvbXBhbnlJZCxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGlmIChleGlzdGluZ01lbWJlcnNoaXApIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nTWVtYmVyc2hpcC5zdGF0dXMgPT09ICdJTlZJVEVEJykge1xuICAgICAgICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6EgdGVtIHVtIGNvbnZpdGUgcGVuZGVudGUgcGFyYSBlc3RhIGVtcHJlc2EnIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBlcnJvcjogJ0VzdGUgdXN1w6FyaW8gasOhIGVzdMOhIGFzc29jaWFkbyBhIGVzdGEgZW1wcmVzYScgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHVzZXIgZG9lc24ndCBleGlzdCwgaW52aXRlIHRoZW0gdmlhIFN1cGFiYXNlXG4gICAgaWYgKCF0YXJnZXRVc2VyKSB7XG4gICAgICBjb25zdCB7IGRhdGE6IGludml0ZURhdGEsIGVycm9yOiBpbnZpdGVFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmludml0ZVVzZXJCeUVtYWlsKGVtYWlsLCB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpbnZpdGVkX2J5OiB1c2VyLmlkLFxuICAgICAgICAgIGNvbXBhbnlfaWQ6IGNvbXBhbnlJZCxcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKGludml0ZUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gZW52aWFyIGNvbnZpdGUgU3VwYWJhc2U6JywgaW52aXRlRXJyb3IpXG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBlbnZpYXIgY29udml0ZSBwb3IgZW1haWwnIH1cbiAgICAgIH1cblxuICAgICAgdGFyZ2V0VXNlciA9IGludml0ZURhdGEudXNlclxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBtZW1iZXJzaGlwIHdpdGggSU5WSVRFRCBzdGF0dXNcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcklkOiB0YXJnZXRVc2VyLmlkLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIHJvbGU6IHVzZXJSb2xlLFxuICAgICAgICBzdGF0dXM6ICdJTlZJVEVEJyxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY29tcGFuaWVzLyR7Y29tcGFueUlkfWApXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQvdXNlcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lbWJlcnNoaXAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gY29udmlkYXIgdXN1w6FyaW86JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIGNvbnZpZGFyIHVzdcOhcmlvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc2VuZEludml0ZShtZW1iZXJzaGlwSWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBpZiAobWVtYmVyc2hpcC5zdGF0dXMgIT09ICdJTlZJVEVEJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdBcGVuYXMgY29udml0ZXMgcGVuZGVudGVzIHBvZGVtIHNlciByZWVudmlhZG9zJyB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNBZG1pbiA9IGF3YWl0IGlzUGxhdGZvcm1BZG1pbih1c2VyLmlkKVxuICAgIGNvbnN0IHJvbGUgPSBhd2FpdCBnZXRVc2VyUm9sZSh1c2VyLmlkLCBtZW1iZXJzaGlwLmNvbXBhbnlJZClcblxuICAgIGlmICghaXNBZG1pbiAmJiByb2xlICE9PSAnQ09NUEFOWV9BRE1JTicpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSByZWVudmlhciBjb252aXRlcycgfVxuICAgIH1cblxuICAgIC8vIEdldCB1c2VyIGVtYWlsIGZyb20gU3VwYWJhc2VcbiAgICBjb25zdCBzdXBhYmFzZUFkbWluID0gY3JlYXRlQWRtaW5DbGllbnQoKVxuICAgIGNvbnN0IHsgZGF0YTogYXV0aFVzZXIgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5nZXRVc2VyQnlJZChtZW1iZXJzaGlwLnVzZXJJZClcblxuICAgIGlmICghYXV0aFVzZXIudXNlcj8uZW1haWwpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRW1haWwgZG8gdXN1w6FyaW8gbsOjbyBlbmNvbnRyYWRvJyB9XG4gICAgfVxuXG4gICAgLy8gRm9yIHVzZXJzIHdpdGggc3RhdHVzIElOVklURUQgdGhhdCBoYXZlbid0IGNvbmZpcm1lZCB0aGVpciBlbWFpbCB5ZXQsXG4gICAgLy8gd2UgbmVlZCB0byBkZWxldGUgYW5kIHJlY3JlYXRlIHRoZW0gdG8gcmVzZW5kIHRoZSBpbnZpdGUgZW1haWxcbiAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIFN1cGFiYXNlJ3MgaW52aXRlVXNlckJ5RW1haWwgZmFpbHMgd2l0aCBcImVtYWlsX2V4aXN0c1wiIFxuICAgIC8vIGZvciB1c2VycyB0aGF0IGhhdmVuJ3QgY29uZmlybWVkIHlldFxuICAgIFxuICAgIC8vIENoZWNrIGlmIHVzZXIgaGFzIGNvbmZpcm1lZCB0aGVpciBlbWFpbFxuICAgIGlmICghYXV0aFVzZXIudXNlci5lbWFpbF9jb25maXJtZWRfYXQpIHtcbiAgICAgIC8vIFVzZXIgaGFzbid0IGNvbmZpcm1lZCB5ZXQgLSBkZWxldGUgYW5kIHJlY3JlYXRlIHRvIHJlc2VuZCBpbnZpdGVcbiAgICAgIGNvbnN0IHsgZXJyb3I6IGRlbGV0ZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4uZGVsZXRlVXNlcihtZW1iZXJzaGlwLnVzZXJJZClcbiAgICAgIFxuICAgICAgaWYgKGRlbGV0ZUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcHJlcGFyYXIgcmVlbnZpbzonLCBkZWxldGVFcnJvcilcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHByZXBhcmFyIHJlZW52aW8gZGUgY29udml0ZScgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZWNyZWF0ZSB1c2VyIHdpdGggc2FtZSBlbWFpbFxuICAgICAgY29uc3QgeyBkYXRhOiBuZXdVc2VyLCBlcnJvcjogY3JlYXRlRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5pbnZpdGVVc2VyQnlFbWFpbChcbiAgICAgICAgYXV0aFVzZXIudXNlci5lbWFpbCxcbiAgICAgICAge1xuICAgICAgICAgIHJlZGlyZWN0VG86IGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NJVEVfVVJMfS9hdXRoL2NhbGxiYWNrYCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpbnZpdGVkX2J5OiB1c2VyLmlkLFxuICAgICAgICAgICAgY29tcGFueV9pZDogbWVtYmVyc2hpcC5jb21wYW55SWQsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIGlmIChjcmVhdGVFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlZW52aWFyIGNvbnZpdGU6JywgY3JlYXRlRXJyb3IpXG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyByZWVudmlhciBjb252aXRlIHBvciBlbWFpbCcgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgbWVtYmVyc2hpcCB3aXRoIG5ldyB1c2VyIElEXG4gICAgICBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH0sXG4gICAgICAgIGRhdGE6IHsgdXNlcklkOiBuZXdVc2VyLnVzZXIhLmlkIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NvbXBhbmllcy8ke21lbWJlcnNoaXAuY29tcGFueUlkfWApXG4gICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZC91c2VycycpXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgICB9XG5cbiAgICAvLyBVc2VyIGhhcyBjb25maXJtZWQgZW1haWwgLSB0aGV5IHNob3VsZCBsb2dpbiBub3JtYWxseVxuICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6EgY29uZmlybW91IG8gZW1haWwuIEVsZSBkZXZlIGZhemVyIGxvZ2luIG5vcm1hbG1lbnRlLicgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcmVlbnZpYXIgY29udml0ZTonLCBlcnJvcilcbiAgICByZXR1cm4geyBlcnJvcjogJ0Vycm8gYW8gcmVlbnZpYXIgY29udml0ZScgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyUm9sZShtZW1iZXJzaGlwSWQ6IHN0cmluZywgbmV3Um9sZTogUm9sZSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIG1lbWJlcnNoaXAuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmIHJvbGUgIT09ICdDT01QQU5ZX0FETUlOJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGFsdGVyYXIgZnVuw6fDtWVzJyB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH0sXG4gICAgICBkYXRhOiB7IHJvbGU6IG5ld1JvbGUgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9jb21wYW5pZXMvJHttZW1iZXJzaGlwLmNvbXBhbnlJZH1gKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL3VzZXJzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZW1iZXJzaGlwOiB1cGRhdGVkIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGF0dWFsaXphciBmdW7Dp8OjbzonLCBlcnJvcilcbiAgICByZXR1cm4geyBlcnJvcjogJ0Vycm8gYW8gYXR1YWxpemFyIGZ1bsOnw6NvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVVzZXJGcm9tQ29tcGFueShtZW1iZXJzaGlwSWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIG1lbWJlcnNoaXAuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmIHJvbGUgIT09ICdDT01QQU5ZX0FETUlOJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIHJlbW92ZXIgdXN1w6FyaW9zJyB9XG4gICAgfVxuXG4gICAgYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZGVsZXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBtZW1iZXJzaGlwSWQgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9jb21wYW5pZXMvJHttZW1iZXJzaGlwLmNvbXBhbnlJZH1gKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL3VzZXJzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlbW92ZXIgdXN1w6FyaW86JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHJlbW92ZXIgdXN1w6FyaW8nIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcGFueVVzZXJzKGNvbXBhbnlJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gIGNvbnN0IHJvbGUgPSBhd2FpdCBnZXRVc2VyUm9sZSh1c2VyLmlkLCBjb21wYW55SWQpXG5cbiAgaWYgKCFpc0FkbWluICYmICFyb2xlKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGFjZXNzYXIgdXN1w6FyaW9zIGRlc3RhIGVtcHJlc2EnIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyBjb21wYW55SWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgY29tcGFueTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgY3JlYXRlZEF0OiAnZGVzYydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgc3VwYWJhc2VBZG1pbiA9IGNyZWF0ZUFkbWluQ2xpZW50KClcbiAgICBjb25zdCB7IGRhdGE6IGF1dGhVc2VycyB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmxpc3RVc2VycygpXG5cbiAgICBjb25zdCB1c2Vyc1dpdGhEZXRhaWxzID0gbWVtYmVyc2hpcHMubWFwKG1lbWJlcnNoaXAgPT4ge1xuICAgICAgY29uc3QgYXV0aFVzZXIgPSBhdXRoVXNlcnM/LnVzZXJzLmZpbmQodSA9PiB1LmlkID09PSBtZW1iZXJzaGlwLnVzZXJJZClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lbWJlcnNoaXAsXG4gICAgICAgIGVtYWlsOiBhdXRoVXNlcj8uZW1haWwsXG4gICAgICAgIG5hbWU6IGF1dGhVc2VyPy51c2VyX21ldGFkYXRhPy5uYW1lLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnNXaXRoRGV0YWlscyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFVzZXJzKCkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgY29uc3QgaXNBZG1pbiA9IGF3YWl0IGlzUGxhdGZvcm1BZG1pbih1c2VyLmlkKVxuXG4gIHRyeSB7XG4gICAgbGV0IG1lbWJlcnNoaXBzXG5cbiAgICBpZiAoaXNBZG1pbikge1xuICAgICAgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1c2VyTWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICAgIHN0YXR1czogJ0FDVElWRSdcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgY29tcGFueUlkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGNvbXBhbnlJZHMgPSB1c2VyTWVtYmVyc2hpcHMubWFwKG0gPT4gbS5jb21wYW55SWQpXG5cbiAgICAgIG1lbWJlcnNoaXBzID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZE1hbnkoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNvbXBhbnlJZDoge1xuICAgICAgICAgICAgaW46IGNvbXBhbnlJZHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVBZG1pbkNsaWVudCgpXG4gICAgY29uc3QgeyBkYXRhOiBhdXRoVXNlcnMgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5saXN0VXNlcnMoKVxuXG4gICAgLy8gR2V0IGFsbCBwbGF0Zm9ybSBhZG1pbnMgdG8gb3ZlcnJpZGUgdGhlaXIgcm9sZSBkaXNwbGF5XG4gICAgY29uc3QgcGxhdGZvcm1BZG1pbnMgPSBhd2FpdCBwcmlzbWEucGxhdGZvcm1BZG1pbi5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHtcbiAgICAgICAgdXNlcklkOiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgICBjb25zdCBwbGF0Zm9ybUFkbWluSWRzID0gbmV3IFNldChwbGF0Zm9ybUFkbWlucy5tYXAocGEgPT4gcGEudXNlcklkKSlcblxuICAgIGNvbnN0IHVzZXJzV2l0aERldGFpbHMgPSBtZW1iZXJzaGlwcy5tYXAobWVtYmVyc2hpcCA9PiB7XG4gICAgICBjb25zdCBhdXRoVXNlciA9IGF1dGhVc2Vycz8udXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IG1lbWJlcnNoaXAudXNlcklkKVxuICAgICAgXG4gICAgICAvLyBJZiB1c2VyIGlzIGEgcGxhdGZvcm0gYWRtaW4sIG92ZXJyaWRlIHRoZWlyIHJvbGUgZm9yIGRpc3BsYXlcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVJvbGUgPSBwbGF0Zm9ybUFkbWluSWRzLmhhcyhtZW1iZXJzaGlwLnVzZXJJZCkgXG4gICAgICAgID8gJ1BMQVRGT1JNX0FETUlOJyBhcyBSb2xlXG4gICAgICAgIDogbWVtYmVyc2hpcC5yb2xlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lbWJlcnNoaXAsXG4gICAgICAgIHJvbGU6IGVmZmVjdGl2ZVJvbGUsXG4gICAgICAgIGVtYWlsOiBhdXRoVXNlcj8uZW1haWwsXG4gICAgICAgIG5hbWU6IGF1dGhVc2VyPy51c2VyX21ldGFkYXRhPy5uYW1lLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnNXaXRoRGV0YWlscyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VQbGF0Zm9ybUFkbWluKHVzZXJJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gIGlmICghaXNBZG1pbikge1xuICAgIHJldHVybiB7IGVycm9yOiAnQXBlbmFzIGFkbWluaXN0cmFkb3JlcyBkYSBwbGF0YWZvcm1hIHBvZGVtIHByb21vdmVyIHVzdcOhcmlvcycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBhZG1pbiA9IGF3YWl0IHByaXNtYS5wbGF0Zm9ybUFkbWluLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQvdXNlcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGFkbWluIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHByb21vdmVyIHVzdcOhcmlvOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6Egw6kgYWRtaW5pc3RyYWRvciBkYSBwbGF0YWZvcm1hJyB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNFJBcUxzQiJ9
}),
"[project]/components/dashboard/edit-user-role-dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditUserRoleDialog",
    ()=>EditUserRoleDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$8cf5d9__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:8cf5d9 [app-ssr] (ecmascript) <text/javascript>");
'use client';
;
;
;
;
;
;
;
function EditUserRoleDialog({ open, onOpenChange, user }) {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedRole, setSelectedRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(user.role);
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$8cf5d9__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateUserRole"])(user.id, selectedRole);
        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            setTimeout(()=>{
                onOpenChange(false);
                setSuccess(false);
            }, 1500);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[400px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "Editar Papel do Usuário"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: [
                                "Altere o papel de ",
                                user.name || user.email
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-4 pt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "role",
                                    children: [
                                        "Papel ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-destructive",
                                            children: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                            lineNumber: 74,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                    value: selectedRole,
                                    onValueChange: (value)=>setSelectedRole(value),
                                    disabled: loading,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                placeholder: "Selecione um papel"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "COMPANY_ADMIN",
                                                    children: "Administrador da Empresa"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "ENGINEER",
                                                    children: "Engenheiro SST"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "EMPLOYER",
                                                    children: "Funcionário"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "VIEWER",
                                                    children: "Visualizador"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Define as permissões do usuário na empresa"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-destructive/10 text-destructive p-3 rounded-lg text-sm",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-green-500/10 text-green-700 p-3 rounded-lg text-sm",
                            children: "Papel atualizado com sucesso!"
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: loading || success || selectedRole === user.role,
                                    className: "flex-1",
                                    children: loading ? 'Salvando...' : success ? 'Salvo!' : 'Salvar'
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "outline",
                                    onClick: ()=>onOpenChange(false),
                                    disabled: loading,
                                    className: "flex-1",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dashboard/edit-user-role-dialog.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/actions/data:6835bc [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4076fc64570c9df2b2b31fcb6d1ff754357813a43f":"resendInvite"},"app/actions/users.ts",""] */ __turbopack_context__.s([
    "resendInvite",
    ()=>resendInvite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var resendInvite = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("4076fc64570c9df2b2b31fcb6d1ff754357813a43f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "resendInvite"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSdcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyLCBpc1BsYXRmb3JtQWRtaW4sIGdldFVzZXJSb2xlIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IFJvbGUsIE1lbWJlcnNoaXBTdGF0dXMgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0AvbGliL3N1cGFiYXNlL3NlcnZlcidcbmltcG9ydCB7IGNyZWF0ZUFkbWluQ2xpZW50IH0gZnJvbSAnQC9saWIvc3VwYWJhc2UvYWRtaW4nXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnZpdGVVc2VyKGNvbXBhbnlJZDogc3RyaW5nLCBmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKClcbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdOw6NvIGF1dG9yaXphZG8nIH1cbiAgfVxuXG4gIGNvbnN0IGlzQWRtaW4gPSBhd2FpdCBpc1BsYXRmb3JtQWRtaW4odXNlci5pZClcbiAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIGNvbXBhbnlJZClcblxuICBpZiAoIWlzQWRtaW4gJiYgcm9sZSAhPT0gJ0NPTVBBTllfQURNSU4nKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdBcGVuYXMgYWRtaW5pc3RyYWRvcmVzIHBvZGVtIGNvbnZpZGFyIHVzdcOhcmlvcycgfVxuICB9XG5cbiAgY29uc3QgZW1haWwgPSBmb3JtRGF0YS5nZXQoJ2VtYWlsJykgYXMgc3RyaW5nXG4gIGNvbnN0IHVzZXJSb2xlID0gZm9ybURhdGEuZ2V0KCdyb2xlJykgYXMgUm9sZVxuXG4gIGlmICghZW1haWwgfHwgIXVzZXJSb2xlKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFbWFpbCBlIGZ1bsOnw6NvIHPDo28gb2JyaWdhdMOzcmlvcycgfVxuICB9XG5cbiAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvXG4gIGlmICghZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgIHJldHVybiB7IGVycm9yOiAnRW1haWwgaW52w6FsaWRvLiBVc2UgbyBmb3JtYXRvOiB1c3VhcmlvQGVtcHJlc2EuY29tJyB9XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVBZG1pbkNsaWVudCgpXG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBhbHJlYWR5IGV4aXN0cyBpbiBTdXBhYmFzZSBBdXRoXG4gICAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1VzZXJzIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4ubGlzdFVzZXJzKClcbiAgICBsZXQgdGFyZ2V0VXNlciA9IGV4aXN0aW5nVXNlcnM/LnVzZXJzLmZpbmQodSA9PiB1LmVtYWlsPy50b0xvd2VyQ2FzZSgpID09PSBlbWFpbC50b0xvd2VyQ2FzZSgpKVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUncyBhbHJlYWR5IGEgbWVtYmVyc2hpcCBmb3IgdGhpcyBlbWFpbC9jb21wYW55XG4gICAgaWYgKHRhcmdldFVzZXIpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nTWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZF9jb21wYW55SWQ6IHtcbiAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlci5pZCxcbiAgICAgICAgICAgIGNvbXBhbnlJZCxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGlmIChleGlzdGluZ01lbWJlcnNoaXApIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nTWVtYmVyc2hpcC5zdGF0dXMgPT09ICdJTlZJVEVEJykge1xuICAgICAgICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6EgdGVtIHVtIGNvbnZpdGUgcGVuZGVudGUgcGFyYSBlc3RhIGVtcHJlc2EnIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBlcnJvcjogJ0VzdGUgdXN1w6FyaW8gasOhIGVzdMOhIGFzc29jaWFkbyBhIGVzdGEgZW1wcmVzYScgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHVzZXIgZG9lc24ndCBleGlzdCwgaW52aXRlIHRoZW0gdmlhIFN1cGFiYXNlXG4gICAgaWYgKCF0YXJnZXRVc2VyKSB7XG4gICAgICBjb25zdCB7IGRhdGE6IGludml0ZURhdGEsIGVycm9yOiBpbnZpdGVFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmludml0ZVVzZXJCeUVtYWlsKGVtYWlsLCB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpbnZpdGVkX2J5OiB1c2VyLmlkLFxuICAgICAgICAgIGNvbXBhbnlfaWQ6IGNvbXBhbnlJZCxcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKGludml0ZUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gZW52aWFyIGNvbnZpdGUgU3VwYWJhc2U6JywgaW52aXRlRXJyb3IpXG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBlbnZpYXIgY29udml0ZSBwb3IgZW1haWwnIH1cbiAgICAgIH1cblxuICAgICAgdGFyZ2V0VXNlciA9IGludml0ZURhdGEudXNlclxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBtZW1iZXJzaGlwIHdpdGggSU5WSVRFRCBzdGF0dXNcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcklkOiB0YXJnZXRVc2VyLmlkLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIHJvbGU6IHVzZXJSb2xlLFxuICAgICAgICBzdGF0dXM6ICdJTlZJVEVEJyxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY29tcGFuaWVzLyR7Y29tcGFueUlkfWApXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQvdXNlcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lbWJlcnNoaXAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gY29udmlkYXIgdXN1w6FyaW86JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIGNvbnZpZGFyIHVzdcOhcmlvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc2VuZEludml0ZShtZW1iZXJzaGlwSWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBpZiAobWVtYmVyc2hpcC5zdGF0dXMgIT09ICdJTlZJVEVEJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdBcGVuYXMgY29udml0ZXMgcGVuZGVudGVzIHBvZGVtIHNlciByZWVudmlhZG9zJyB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNBZG1pbiA9IGF3YWl0IGlzUGxhdGZvcm1BZG1pbih1c2VyLmlkKVxuICAgIGNvbnN0IHJvbGUgPSBhd2FpdCBnZXRVc2VyUm9sZSh1c2VyLmlkLCBtZW1iZXJzaGlwLmNvbXBhbnlJZClcblxuICAgIGlmICghaXNBZG1pbiAmJiByb2xlICE9PSAnQ09NUEFOWV9BRE1JTicpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSByZWVudmlhciBjb252aXRlcycgfVxuICAgIH1cblxuICAgIC8vIEdldCB1c2VyIGVtYWlsIGZyb20gU3VwYWJhc2VcbiAgICBjb25zdCBzdXBhYmFzZUFkbWluID0gY3JlYXRlQWRtaW5DbGllbnQoKVxuICAgIGNvbnN0IHsgZGF0YTogYXV0aFVzZXIgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5nZXRVc2VyQnlJZChtZW1iZXJzaGlwLnVzZXJJZClcblxuICAgIGlmICghYXV0aFVzZXIudXNlcj8uZW1haWwpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRW1haWwgZG8gdXN1w6FyaW8gbsOjbyBlbmNvbnRyYWRvJyB9XG4gICAgfVxuXG4gICAgLy8gRm9yIHVzZXJzIHdpdGggc3RhdHVzIElOVklURUQgdGhhdCBoYXZlbid0IGNvbmZpcm1lZCB0aGVpciBlbWFpbCB5ZXQsXG4gICAgLy8gd2UgbmVlZCB0byBkZWxldGUgYW5kIHJlY3JlYXRlIHRoZW0gdG8gcmVzZW5kIHRoZSBpbnZpdGUgZW1haWxcbiAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIFN1cGFiYXNlJ3MgaW52aXRlVXNlckJ5RW1haWwgZmFpbHMgd2l0aCBcImVtYWlsX2V4aXN0c1wiIFxuICAgIC8vIGZvciB1c2VycyB0aGF0IGhhdmVuJ3QgY29uZmlybWVkIHlldFxuICAgIFxuICAgIC8vIENoZWNrIGlmIHVzZXIgaGFzIGNvbmZpcm1lZCB0aGVpciBlbWFpbFxuICAgIGlmICghYXV0aFVzZXIudXNlci5lbWFpbF9jb25maXJtZWRfYXQpIHtcbiAgICAgIC8vIFVzZXIgaGFzbid0IGNvbmZpcm1lZCB5ZXQgLSBkZWxldGUgYW5kIHJlY3JlYXRlIHRvIHJlc2VuZCBpbnZpdGVcbiAgICAgIGNvbnN0IHsgZXJyb3I6IGRlbGV0ZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4uZGVsZXRlVXNlcihtZW1iZXJzaGlwLnVzZXJJZClcbiAgICAgIFxuICAgICAgaWYgKGRlbGV0ZUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcHJlcGFyYXIgcmVlbnZpbzonLCBkZWxldGVFcnJvcilcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHByZXBhcmFyIHJlZW52aW8gZGUgY29udml0ZScgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZWNyZWF0ZSB1c2VyIHdpdGggc2FtZSBlbWFpbFxuICAgICAgY29uc3QgeyBkYXRhOiBuZXdVc2VyLCBlcnJvcjogY3JlYXRlRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5pbnZpdGVVc2VyQnlFbWFpbChcbiAgICAgICAgYXV0aFVzZXIudXNlci5lbWFpbCxcbiAgICAgICAge1xuICAgICAgICAgIHJlZGlyZWN0VG86IGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NJVEVfVVJMfS9hdXRoL2NhbGxiYWNrYCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpbnZpdGVkX2J5OiB1c2VyLmlkLFxuICAgICAgICAgICAgY29tcGFueV9pZDogbWVtYmVyc2hpcC5jb21wYW55SWQsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIGlmIChjcmVhdGVFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlZW52aWFyIGNvbnZpdGU6JywgY3JlYXRlRXJyb3IpXG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyByZWVudmlhciBjb252aXRlIHBvciBlbWFpbCcgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgbWVtYmVyc2hpcCB3aXRoIG5ldyB1c2VyIElEXG4gICAgICBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH0sXG4gICAgICAgIGRhdGE6IHsgdXNlcklkOiBuZXdVc2VyLnVzZXIhLmlkIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NvbXBhbmllcy8ke21lbWJlcnNoaXAuY29tcGFueUlkfWApXG4gICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZC91c2VycycpXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgICB9XG5cbiAgICAvLyBVc2VyIGhhcyBjb25maXJtZWQgZW1haWwgLSB0aGV5IHNob3VsZCBsb2dpbiBub3JtYWxseVxuICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6EgY29uZmlybW91IG8gZW1haWwuIEVsZSBkZXZlIGZhemVyIGxvZ2luIG5vcm1hbG1lbnRlLicgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcmVlbnZpYXIgY29udml0ZTonLCBlcnJvcilcbiAgICByZXR1cm4geyBlcnJvcjogJ0Vycm8gYW8gcmVlbnZpYXIgY29udml0ZScgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyUm9sZShtZW1iZXJzaGlwSWQ6IHN0cmluZywgbmV3Um9sZTogUm9sZSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIG1lbWJlcnNoaXAuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmIHJvbGUgIT09ICdDT01QQU5ZX0FETUlOJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGFsdGVyYXIgZnVuw6fDtWVzJyB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH0sXG4gICAgICBkYXRhOiB7IHJvbGU6IG5ld1JvbGUgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9jb21wYW5pZXMvJHttZW1iZXJzaGlwLmNvbXBhbnlJZH1gKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL3VzZXJzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZW1iZXJzaGlwOiB1cGRhdGVkIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGF0dWFsaXphciBmdW7Dp8OjbzonLCBlcnJvcilcbiAgICByZXR1cm4geyBlcnJvcjogJ0Vycm8gYW8gYXR1YWxpemFyIGZ1bsOnw6NvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVVzZXJGcm9tQ29tcGFueShtZW1iZXJzaGlwSWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIG1lbWJlcnNoaXAuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmIHJvbGUgIT09ICdDT01QQU5ZX0FETUlOJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIHJlbW92ZXIgdXN1w6FyaW9zJyB9XG4gICAgfVxuXG4gICAgYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZGVsZXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBtZW1iZXJzaGlwSWQgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9jb21wYW5pZXMvJHttZW1iZXJzaGlwLmNvbXBhbnlJZH1gKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL3VzZXJzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlbW92ZXIgdXN1w6FyaW86JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHJlbW92ZXIgdXN1w6FyaW8nIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcGFueVVzZXJzKGNvbXBhbnlJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gIGNvbnN0IHJvbGUgPSBhd2FpdCBnZXRVc2VyUm9sZSh1c2VyLmlkLCBjb21wYW55SWQpXG5cbiAgaWYgKCFpc0FkbWluICYmICFyb2xlKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGFjZXNzYXIgdXN1w6FyaW9zIGRlc3RhIGVtcHJlc2EnIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyBjb21wYW55SWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgY29tcGFueTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgY3JlYXRlZEF0OiAnZGVzYydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgc3VwYWJhc2VBZG1pbiA9IGNyZWF0ZUFkbWluQ2xpZW50KClcbiAgICBjb25zdCB7IGRhdGE6IGF1dGhVc2VycyB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmxpc3RVc2VycygpXG5cbiAgICBjb25zdCB1c2Vyc1dpdGhEZXRhaWxzID0gbWVtYmVyc2hpcHMubWFwKG1lbWJlcnNoaXAgPT4ge1xuICAgICAgY29uc3QgYXV0aFVzZXIgPSBhdXRoVXNlcnM/LnVzZXJzLmZpbmQodSA9PiB1LmlkID09PSBtZW1iZXJzaGlwLnVzZXJJZClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lbWJlcnNoaXAsXG4gICAgICAgIGVtYWlsOiBhdXRoVXNlcj8uZW1haWwsXG4gICAgICAgIG5hbWU6IGF1dGhVc2VyPy51c2VyX21ldGFkYXRhPy5uYW1lLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnNXaXRoRGV0YWlscyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFVzZXJzKCkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgY29uc3QgaXNBZG1pbiA9IGF3YWl0IGlzUGxhdGZvcm1BZG1pbih1c2VyLmlkKVxuXG4gIHRyeSB7XG4gICAgbGV0IG1lbWJlcnNoaXBzXG5cbiAgICBpZiAoaXNBZG1pbikge1xuICAgICAgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1c2VyTWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICAgIHN0YXR1czogJ0FDVElWRSdcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgY29tcGFueUlkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGNvbXBhbnlJZHMgPSB1c2VyTWVtYmVyc2hpcHMubWFwKG0gPT4gbS5jb21wYW55SWQpXG5cbiAgICAgIG1lbWJlcnNoaXBzID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZE1hbnkoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNvbXBhbnlJZDoge1xuICAgICAgICAgICAgaW46IGNvbXBhbnlJZHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVBZG1pbkNsaWVudCgpXG4gICAgY29uc3QgeyBkYXRhOiBhdXRoVXNlcnMgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5saXN0VXNlcnMoKVxuXG4gICAgLy8gR2V0IGFsbCBwbGF0Zm9ybSBhZG1pbnMgdG8gb3ZlcnJpZGUgdGhlaXIgcm9sZSBkaXNwbGF5XG4gICAgY29uc3QgcGxhdGZvcm1BZG1pbnMgPSBhd2FpdCBwcmlzbWEucGxhdGZvcm1BZG1pbi5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHtcbiAgICAgICAgdXNlcklkOiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgICBjb25zdCBwbGF0Zm9ybUFkbWluSWRzID0gbmV3IFNldChwbGF0Zm9ybUFkbWlucy5tYXAocGEgPT4gcGEudXNlcklkKSlcblxuICAgIGNvbnN0IHVzZXJzV2l0aERldGFpbHMgPSBtZW1iZXJzaGlwcy5tYXAobWVtYmVyc2hpcCA9PiB7XG4gICAgICBjb25zdCBhdXRoVXNlciA9IGF1dGhVc2Vycz8udXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IG1lbWJlcnNoaXAudXNlcklkKVxuICAgICAgXG4gICAgICAvLyBJZiB1c2VyIGlzIGEgcGxhdGZvcm0gYWRtaW4sIG92ZXJyaWRlIHRoZWlyIHJvbGUgZm9yIGRpc3BsYXlcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVJvbGUgPSBwbGF0Zm9ybUFkbWluSWRzLmhhcyhtZW1iZXJzaGlwLnVzZXJJZCkgXG4gICAgICAgID8gJ1BMQVRGT1JNX0FETUlOJyBhcyBSb2xlXG4gICAgICAgIDogbWVtYmVyc2hpcC5yb2xlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lbWJlcnNoaXAsXG4gICAgICAgIHJvbGU6IGVmZmVjdGl2ZVJvbGUsXG4gICAgICAgIGVtYWlsOiBhdXRoVXNlcj8uZW1haWwsXG4gICAgICAgIG5hbWU6IGF1dGhVc2VyPy51c2VyX21ldGFkYXRhPy5uYW1lLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnNXaXRoRGV0YWlscyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VQbGF0Zm9ybUFkbWluKHVzZXJJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gIGlmICghaXNBZG1pbikge1xuICAgIHJldHVybiB7IGVycm9yOiAnQXBlbmFzIGFkbWluaXN0cmFkb3JlcyBkYSBwbGF0YWZvcm1hIHBvZGVtIHByb21vdmVyIHVzdcOhcmlvcycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBhZG1pbiA9IGF3YWl0IHByaXNtYS5wbGF0Zm9ybUFkbWluLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQvdXNlcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGFkbWluIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHByb21vdmVyIHVzdcOhcmlvOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6Egw6kgYWRtaW5pc3RyYWRvciBkYSBwbGF0YWZvcm1hJyB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMFJBZ0dzQiJ9
}),
"[project]/app/actions/data:7979aa [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4014b5a8a427be5d777493239d9e860e3848e3cf03":"removeUserFromCompany"},"app/actions/users.ts",""] */ __turbopack_context__.s([
    "removeUserFromCompany",
    ()=>removeUserFromCompany
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var removeUserFromCompany = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("4014b5a8a427be5d777493239d9e860e3848e3cf03", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "removeUserFromCompany"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdXNlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInXG5cbmltcG9ydCB7IHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSdcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyLCBpc1BsYXRmb3JtQWRtaW4sIGdldFVzZXJSb2xlIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IFJvbGUsIE1lbWJlcnNoaXBTdGF0dXMgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0AvbGliL3N1cGFiYXNlL3NlcnZlcidcbmltcG9ydCB7IGNyZWF0ZUFkbWluQ2xpZW50IH0gZnJvbSAnQC9saWIvc3VwYWJhc2UvYWRtaW4nXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbnZpdGVVc2VyKGNvbXBhbnlJZDogc3RyaW5nLCBmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKClcbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdOw6NvIGF1dG9yaXphZG8nIH1cbiAgfVxuXG4gIGNvbnN0IGlzQWRtaW4gPSBhd2FpdCBpc1BsYXRmb3JtQWRtaW4odXNlci5pZClcbiAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIGNvbXBhbnlJZClcblxuICBpZiAoIWlzQWRtaW4gJiYgcm9sZSAhPT0gJ0NPTVBBTllfQURNSU4nKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdBcGVuYXMgYWRtaW5pc3RyYWRvcmVzIHBvZGVtIGNvbnZpZGFyIHVzdcOhcmlvcycgfVxuICB9XG5cbiAgY29uc3QgZW1haWwgPSBmb3JtRGF0YS5nZXQoJ2VtYWlsJykgYXMgc3RyaW5nXG4gIGNvbnN0IHVzZXJSb2xlID0gZm9ybURhdGEuZ2V0KCdyb2xlJykgYXMgUm9sZVxuXG4gIGlmICghZW1haWwgfHwgIXVzZXJSb2xlKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFbWFpbCBlIGZ1bsOnw6NvIHPDo28gb2JyaWdhdMOzcmlvcycgfVxuICB9XG5cbiAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvXG4gIGlmICghZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgIHJldHVybiB7IGVycm9yOiAnRW1haWwgaW52w6FsaWRvLiBVc2UgbyBmb3JtYXRvOiB1c3VhcmlvQGVtcHJlc2EuY29tJyB9XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVBZG1pbkNsaWVudCgpXG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBhbHJlYWR5IGV4aXN0cyBpbiBTdXBhYmFzZSBBdXRoXG4gICAgY29uc3QgeyBkYXRhOiBleGlzdGluZ1VzZXJzIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4ubGlzdFVzZXJzKClcbiAgICBsZXQgdGFyZ2V0VXNlciA9IGV4aXN0aW5nVXNlcnM/LnVzZXJzLmZpbmQodSA9PiB1LmVtYWlsPy50b0xvd2VyQ2FzZSgpID09PSBlbWFpbC50b0xvd2VyQ2FzZSgpKVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUncyBhbHJlYWR5IGEgbWVtYmVyc2hpcCBmb3IgdGhpcyBlbWFpbC9jb21wYW55XG4gICAgaWYgKHRhcmdldFVzZXIpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nTWVtYmVyc2hpcCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLmZpbmRVbmlxdWUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIHVzZXJJZF9jb21wYW55SWQ6IHtcbiAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlci5pZCxcbiAgICAgICAgICAgIGNvbXBhbnlJZCxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGlmIChleGlzdGluZ01lbWJlcnNoaXApIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nTWVtYmVyc2hpcC5zdGF0dXMgPT09ICdJTlZJVEVEJykge1xuICAgICAgICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6EgdGVtIHVtIGNvbnZpdGUgcGVuZGVudGUgcGFyYSBlc3RhIGVtcHJlc2EnIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBlcnJvcjogJ0VzdGUgdXN1w6FyaW8gasOhIGVzdMOhIGFzc29jaWFkbyBhIGVzdGEgZW1wcmVzYScgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHVzZXIgZG9lc24ndCBleGlzdCwgaW52aXRlIHRoZW0gdmlhIFN1cGFiYXNlXG4gICAgaWYgKCF0YXJnZXRVc2VyKSB7XG4gICAgICBjb25zdCB7IGRhdGE6IGludml0ZURhdGEsIGVycm9yOiBpbnZpdGVFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmludml0ZVVzZXJCeUVtYWlsKGVtYWlsLCB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpbnZpdGVkX2J5OiB1c2VyLmlkLFxuICAgICAgICAgIGNvbXBhbnlfaWQ6IGNvbXBhbnlJZCxcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKGludml0ZUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gZW52aWFyIGNvbnZpdGUgU3VwYWJhc2U6JywgaW52aXRlRXJyb3IpXG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBlbnZpYXIgY29udml0ZSBwb3IgZW1haWwnIH1cbiAgICAgIH1cblxuICAgICAgdGFyZ2V0VXNlciA9IGludml0ZURhdGEudXNlclxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBtZW1iZXJzaGlwIHdpdGggSU5WSVRFRCBzdGF0dXNcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcklkOiB0YXJnZXRVc2VyLmlkLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIHJvbGU6IHVzZXJSb2xlLFxuICAgICAgICBzdGF0dXM6ICdJTlZJVEVEJyxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoYC9kYXNoYm9hcmQvY29tcGFuaWVzLyR7Y29tcGFueUlkfWApXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQvdXNlcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1lbWJlcnNoaXAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gY29udmlkYXIgdXN1w6FyaW86JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIGNvbnZpZGFyIHVzdcOhcmlvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc2VuZEludml0ZShtZW1iZXJzaGlwSWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBpZiAobWVtYmVyc2hpcC5zdGF0dXMgIT09ICdJTlZJVEVEJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdBcGVuYXMgY29udml0ZXMgcGVuZGVudGVzIHBvZGVtIHNlciByZWVudmlhZG9zJyB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNBZG1pbiA9IGF3YWl0IGlzUGxhdGZvcm1BZG1pbih1c2VyLmlkKVxuICAgIGNvbnN0IHJvbGUgPSBhd2FpdCBnZXRVc2VyUm9sZSh1c2VyLmlkLCBtZW1iZXJzaGlwLmNvbXBhbnlJZClcblxuICAgIGlmICghaXNBZG1pbiAmJiByb2xlICE9PSAnQ09NUEFOWV9BRE1JTicpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnU2VtIHBlcm1pc3PDo28gcGFyYSByZWVudmlhciBjb252aXRlcycgfVxuICAgIH1cblxuICAgIC8vIEdldCB1c2VyIGVtYWlsIGZyb20gU3VwYWJhc2VcbiAgICBjb25zdCBzdXBhYmFzZUFkbWluID0gY3JlYXRlQWRtaW5DbGllbnQoKVxuICAgIGNvbnN0IHsgZGF0YTogYXV0aFVzZXIgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5nZXRVc2VyQnlJZChtZW1iZXJzaGlwLnVzZXJJZClcblxuICAgIGlmICghYXV0aFVzZXIudXNlcj8uZW1haWwpIHtcbiAgICAgIHJldHVybiB7IGVycm9yOiAnRW1haWwgZG8gdXN1w6FyaW8gbsOjbyBlbmNvbnRyYWRvJyB9XG4gICAgfVxuXG4gICAgLy8gRm9yIHVzZXJzIHdpdGggc3RhdHVzIElOVklURUQgdGhhdCBoYXZlbid0IGNvbmZpcm1lZCB0aGVpciBlbWFpbCB5ZXQsXG4gICAgLy8gd2UgbmVlZCB0byBkZWxldGUgYW5kIHJlY3JlYXRlIHRoZW0gdG8gcmVzZW5kIHRoZSBpbnZpdGUgZW1haWxcbiAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIFN1cGFiYXNlJ3MgaW52aXRlVXNlckJ5RW1haWwgZmFpbHMgd2l0aCBcImVtYWlsX2V4aXN0c1wiIFxuICAgIC8vIGZvciB1c2VycyB0aGF0IGhhdmVuJ3QgY29uZmlybWVkIHlldFxuICAgIFxuICAgIC8vIENoZWNrIGlmIHVzZXIgaGFzIGNvbmZpcm1lZCB0aGVpciBlbWFpbFxuICAgIGlmICghYXV0aFVzZXIudXNlci5lbWFpbF9jb25maXJtZWRfYXQpIHtcbiAgICAgIC8vIFVzZXIgaGFzbid0IGNvbmZpcm1lZCB5ZXQgLSBkZWxldGUgYW5kIHJlY3JlYXRlIHRvIHJlc2VuZCBpbnZpdGVcbiAgICAgIGNvbnN0IHsgZXJyb3I6IGRlbGV0ZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4uZGVsZXRlVXNlcihtZW1iZXJzaGlwLnVzZXJJZClcbiAgICAgIFxuICAgICAgaWYgKGRlbGV0ZUVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcHJlcGFyYXIgcmVlbnZpbzonLCBkZWxldGVFcnJvcilcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHByZXBhcmFyIHJlZW52aW8gZGUgY29udml0ZScgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZWNyZWF0ZSB1c2VyIHdpdGggc2FtZSBlbWFpbFxuICAgICAgY29uc3QgeyBkYXRhOiBuZXdVc2VyLCBlcnJvcjogY3JlYXRlRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5pbnZpdGVVc2VyQnlFbWFpbChcbiAgICAgICAgYXV0aFVzZXIudXNlci5lbWFpbCxcbiAgICAgICAge1xuICAgICAgICAgIHJlZGlyZWN0VG86IGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NJVEVfVVJMfS9hdXRoL2NhbGxiYWNrYCxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpbnZpdGVkX2J5OiB1c2VyLmlkLFxuICAgICAgICAgICAgY29tcGFueV9pZDogbWVtYmVyc2hpcC5jb21wYW55SWQsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIGlmIChjcmVhdGVFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlZW52aWFyIGNvbnZpdGU6JywgY3JlYXRlRXJyb3IpXG4gICAgICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyByZWVudmlhciBjb252aXRlIHBvciBlbWFpbCcgfVxuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgbWVtYmVyc2hpcCB3aXRoIG5ldyB1c2VyIElEXG4gICAgICBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH0sXG4gICAgICAgIGRhdGE6IHsgdXNlcklkOiBuZXdVc2VyLnVzZXIhLmlkIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldmFsaWRhdGVQYXRoKGAvZGFzaGJvYXJkL2NvbXBhbmllcy8ke21lbWJlcnNoaXAuY29tcGFueUlkfWApXG4gICAgICByZXZhbGlkYXRlUGF0aCgnL2Rhc2hib2FyZC91c2VycycpXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgICB9XG5cbiAgICAvLyBVc2VyIGhhcyBjb25maXJtZWQgZW1haWwgLSB0aGV5IHNob3VsZCBsb2dpbiBub3JtYWxseVxuICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6EgY29uZmlybW91IG8gZW1haWwuIEVsZSBkZXZlIGZhemVyIGxvZ2luIG5vcm1hbG1lbnRlLicgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm8gYW8gcmVlbnZpYXIgY29udml0ZTonLCBlcnJvcilcbiAgICByZXR1cm4geyBlcnJvcjogJ0Vycm8gYW8gcmVlbnZpYXIgY29udml0ZScgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyUm9sZShtZW1iZXJzaGlwSWQ6IHN0cmluZywgbmV3Um9sZTogUm9sZSkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIG1lbWJlcnNoaXAuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmIHJvbGUgIT09ICdDT01QQU5ZX0FETUlOJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGFsdGVyYXIgZnVuw6fDtWVzJyB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHByaXNtYS5tZW1iZXJzaGlwLnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH0sXG4gICAgICBkYXRhOiB7IHJvbGU6IG5ld1JvbGUgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9jb21wYW5pZXMvJHttZW1iZXJzaGlwLmNvbXBhbnlJZH1gKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL3VzZXJzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZW1iZXJzaGlwOiB1cGRhdGVkIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGF0dWFsaXphciBmdW7Dp8OjbzonLCBlcnJvcilcbiAgICByZXR1cm4geyBlcnJvcjogJ0Vycm8gYW8gYXR1YWxpemFyIGZ1bsOnw6NvJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVVzZXJGcm9tQ29tcGFueShtZW1iZXJzaGlwSWQ6IHN0cmluZykge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZW1iZXJzaGlwID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogbWVtYmVyc2hpcElkIH1cbiAgICB9KVxuXG4gICAgaWYgKCFtZW1iZXJzaGlwKSB7XG4gICAgICByZXR1cm4geyBlcnJvcjogJ01lbWJybyBuw6NvIGVuY29udHJhZG8nIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gICAgY29uc3Qgcm9sZSA9IGF3YWl0IGdldFVzZXJSb2xlKHVzZXIuaWQsIG1lbWJlcnNoaXAuY29tcGFueUlkKVxuXG4gICAgaWYgKCFpc0FkbWluICYmIHJvbGUgIT09ICdDT01QQU5ZX0FETUlOJykge1xuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIHJlbW92ZXIgdXN1w6FyaW9zJyB9XG4gICAgfVxuXG4gICAgYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZGVsZXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBtZW1iZXJzaGlwSWQgfVxuICAgIH0pXG5cbiAgICByZXZhbGlkYXRlUGF0aChgL2Rhc2hib2FyZC9jb21wYW5pZXMvJHttZW1iZXJzaGlwLmNvbXBhbnlJZH1gKVxuICAgIHJldmFsaWRhdGVQYXRoKCcvZGFzaGJvYXJkL3VzZXJzJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHJlbW92ZXIgdXN1w6FyaW86JywgZXJyb3IpXG4gICAgcmV0dXJuIHsgZXJyb3I6ICdFcnJvIGFvIHJlbW92ZXIgdXN1w6FyaW8nIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcGFueVVzZXJzKGNvbXBhbnlJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gIGNvbnN0IHJvbGUgPSBhd2FpdCBnZXRVc2VyUm9sZSh1c2VyLmlkLCBjb21wYW55SWQpXG5cbiAgaWYgKCFpc0FkbWluICYmICFyb2xlKSB7XG4gICAgcmV0dXJuIHsgZXJyb3I6ICdTZW0gcGVybWlzc8OjbyBwYXJhIGFjZXNzYXIgdXN1w6FyaW9zIGRlc3RhIGVtcHJlc2EnIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICB3aGVyZTogeyBjb21wYW55SWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgY29tcGFueTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgY3JlYXRlZEF0OiAnZGVzYydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgc3VwYWJhc2VBZG1pbiA9IGNyZWF0ZUFkbWluQ2xpZW50KClcbiAgICBjb25zdCB7IGRhdGE6IGF1dGhVc2VycyB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmxpc3RVc2VycygpXG5cbiAgICBjb25zdCB1c2Vyc1dpdGhEZXRhaWxzID0gbWVtYmVyc2hpcHMubWFwKG1lbWJlcnNoaXAgPT4ge1xuICAgICAgY29uc3QgYXV0aFVzZXIgPSBhdXRoVXNlcnM/LnVzZXJzLmZpbmQodSA9PiB1LmlkID09PSBtZW1iZXJzaGlwLnVzZXJJZClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lbWJlcnNoaXAsXG4gICAgICAgIGVtYWlsOiBhdXRoVXNlcj8uZW1haWwsXG4gICAgICAgIG5hbWU6IGF1dGhVc2VyPy51c2VyX21ldGFkYXRhPy5uYW1lLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnNXaXRoRGV0YWlscyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFVzZXJzKCkge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKVxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4geyBlcnJvcjogJ07Do28gYXV0b3JpemFkbycgfVxuICB9XG5cbiAgY29uc3QgaXNBZG1pbiA9IGF3YWl0IGlzUGxhdGZvcm1BZG1pbih1c2VyLmlkKVxuXG4gIHRyeSB7XG4gICAgbGV0IG1lbWJlcnNoaXBzXG5cbiAgICBpZiAoaXNBZG1pbikge1xuICAgICAgbWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1c2VyTWVtYmVyc2hpcHMgPSBhd2FpdCBwcmlzbWEubWVtYmVyc2hpcC5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICAgIHN0YXR1czogJ0FDVElWRSdcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgY29tcGFueUlkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGNvbXBhbnlJZHMgPSB1c2VyTWVtYmVyc2hpcHMubWFwKG0gPT4gbS5jb21wYW55SWQpXG5cbiAgICAgIG1lbWJlcnNoaXBzID0gYXdhaXQgcHJpc21hLm1lbWJlcnNoaXAuZmluZE1hbnkoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGNvbXBhbnlJZDoge1xuICAgICAgICAgICAgaW46IGNvbXBhbnlJZHNcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICBjb21wYW55OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6ICdkZXNjJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVBZG1pbkNsaWVudCgpXG4gICAgY29uc3QgeyBkYXRhOiBhdXRoVXNlcnMgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5saXN0VXNlcnMoKVxuXG4gICAgLy8gR2V0IGFsbCBwbGF0Zm9ybSBhZG1pbnMgdG8gb3ZlcnJpZGUgdGhlaXIgcm9sZSBkaXNwbGF5XG4gICAgY29uc3QgcGxhdGZvcm1BZG1pbnMgPSBhd2FpdCBwcmlzbWEucGxhdGZvcm1BZG1pbi5maW5kTWFueSh7XG4gICAgICBzZWxlY3Q6IHtcbiAgICAgICAgdXNlcklkOiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgICBjb25zdCBwbGF0Zm9ybUFkbWluSWRzID0gbmV3IFNldChwbGF0Zm9ybUFkbWlucy5tYXAocGEgPT4gcGEudXNlcklkKSlcblxuICAgIGNvbnN0IHVzZXJzV2l0aERldGFpbHMgPSBtZW1iZXJzaGlwcy5tYXAobWVtYmVyc2hpcCA9PiB7XG4gICAgICBjb25zdCBhdXRoVXNlciA9IGF1dGhVc2Vycz8udXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IG1lbWJlcnNoaXAudXNlcklkKVxuICAgICAgXG4gICAgICAvLyBJZiB1c2VyIGlzIGEgcGxhdGZvcm0gYWRtaW4sIG92ZXJyaWRlIHRoZWlyIHJvbGUgZm9yIGRpc3BsYXlcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZVJvbGUgPSBwbGF0Zm9ybUFkbWluSWRzLmhhcyhtZW1iZXJzaGlwLnVzZXJJZCkgXG4gICAgICAgID8gJ1BMQVRGT1JNX0FETUlOJyBhcyBSb2xlXG4gICAgICAgIDogbWVtYmVyc2hpcC5yb2xlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lbWJlcnNoaXAsXG4gICAgICAgIHJvbGU6IGVmZmVjdGl2ZVJvbGUsXG4gICAgICAgIGVtYWlsOiBhdXRoVXNlcj8uZW1haWwsXG4gICAgICAgIG5hbWU6IGF1dGhVc2VyPy51c2VyX21ldGFkYXRhPy5uYW1lLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCB1c2VyczogdXNlcnNXaXRoRGV0YWlscyB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXJybyBhbyBidXNjYXIgdXN1w6FyaW9zJyB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VQbGF0Zm9ybUFkbWluKHVzZXJJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiB7IGVycm9yOiAnTsOjbyBhdXRvcml6YWRvJyB9XG4gIH1cblxuICBjb25zdCBpc0FkbWluID0gYXdhaXQgaXNQbGF0Zm9ybUFkbWluKHVzZXIuaWQpXG4gIGlmICghaXNBZG1pbikge1xuICAgIHJldHVybiB7IGVycm9yOiAnQXBlbmFzIGFkbWluaXN0cmFkb3JlcyBkYSBwbGF0YWZvcm1hIHBvZGVtIHByb21vdmVyIHVzdcOhcmlvcycgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBhZG1pbiA9IGF3YWl0IHByaXNtYS5wbGF0Zm9ybUFkbWluLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9kYXNoYm9hcmQvdXNlcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGFkbWluIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHByb21vdmVyIHVzdcOhcmlvOicsIGVycm9yKVxuICAgIHJldHVybiB7IGVycm9yOiAnRXN0ZSB1c3XDoXJpbyBqw6Egw6kgYWRtaW5pc3RyYWRvciBkYSBwbGF0YWZvcm1hJyB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVNBeU5zQiJ9
}),
"[project]/components/dashboard/users-list.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UsersList",
    ()=>UsersList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-ssr] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$cog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCog$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-cog.js [app-ssr] (ecmascript) <export default as UserCog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$edit$2d$user$2d$role$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/edit-user-role-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$6835bc__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:6835bc [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$7979aa__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:7979aa [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
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
const roleIcons = {
    PLATFORM_ADMIN: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        color: 'bg-red-100 text-red-700',
        label: 'Admin Plataforma'
    },
    COMPANY_ADMIN: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$cog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCog$3e$__["UserCog"],
        color: 'bg-orange-100 text-orange-700',
        label: 'Admin Empresa'
    },
    ENGINEER: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        color: 'bg-blue-100 text-blue-700',
        label: 'Engenheiro SST'
    },
    EMPLOYER: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        color: 'bg-green-100 text-green-700',
        label: 'Funcionário'
    },
    VIEWER: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        color: 'bg-gray-100 text-gray-700',
        label: 'Visualizador'
    }
};
function UsersList({ users }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [editingUser, setEditingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [removingUser, setRemovingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    async function handleResendInvite(user) {
        setLoading(user.id);
        setError('');
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$6835bc__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resendInvite"])(user.id);
        if (result.error) {
            setError(result.error);
        }
        setLoading(null);
        router.refresh();
    }
    async function handleRemoveUser() {
        if (!removingUser) return;
        setLoading(removingUser.id);
        setError('');
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$7979aa__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["removeUserFromCompany"])(removingUser.id);
        if (result.error) {
            setError(result.error);
        } else {
            setRemovingUser(null);
            router.refresh();
        }
        setLoading(null);
    }
    if (users.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "flex flex-col items-center justify-center py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                        className: "h-16 w-16 text-muted-foreground/50 mb-4"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/users-list.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2",
                        children: "Nenhum usuário encontrado"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/users-list.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground text-center max-w-md",
                        children: "Comece criando sua conta ou convidando membros para suas empresas"
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/users-list.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard/users-list.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dashboard/users-list.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "p-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divide-y",
                        children: users.map((user)=>{
                            const roleConfig = roleIcons[user.role];
                            const RoleIcon = roleConfig.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 hover:bg-muted/50 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `p-3 rounded-lg ${roleConfig.color}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleIcon, {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/users-list.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-semibold",
                                                            children: user.name || user.email || 'Usuário sem nome'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-muted-foreground flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                                    lineNumber: 130,
                                                                    columnNumber: 27
                                                                }, this),
                                                                user.email || user.userId
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                                            lineNumber: 129,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-medium",
                                                            children: user.company.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: roleConfig.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : user.status === 'INVITED' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`,
                                                        children: user.status === 'ACTIVE' ? 'Ativo' : user.status === 'INVITED' ? 'Convite Pendente' : 'Inativo'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/users-list.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                            lineNumber: 121,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "ghost",
                                                        size: "sm",
                                                        className: "h-8 w-8 p-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard/users-list.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                    align: "end",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                            onClick: ()=>setEditingUser(user),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                    className: "h-4 w-4 mr-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                                    lineNumber: 158,
                                                                    columnNumber: 27
                                                                }, this),
                                                                "Editar Papel"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 25
                                                        }, this),
                                                        user.status === 'INVITED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                            onClick: ()=>handleResendInvite(user),
                                                            disabled: loading === user.id,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                    className: "h-4 w-4 mr-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                                    lineNumber: 166,
                                                                    columnNumber: 29
                                                                }, this),
                                                                loading === user.id ? 'Enviando...' : 'Reenviar Convite'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                            onClick: ()=>setRemovingUser(user),
                                                            className: "text-destructive focus:text-destructive",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-4 w-4 mr-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 27
                                                                }, this),
                                                                "Remover"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                            lineNumber: 150,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                    lineNumber: 120,
                                    columnNumber: 19
                                }, this)
                            }, user.id, false, {
                                fileName: "[project]/components/dashboard/users-list.tsx",
                                lineNumber: 119,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard/users-list.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dashboard/users-list.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/users-list.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-destructive/10 text-destructive p-3 rounded-lg text-sm mt-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/dashboard/users-list.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this),
            editingUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$edit$2d$user$2d$role$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditUserRoleDialog"], {
                open: !!editingUser,
                onOpenChange: (open)=>{
                    if (!open) setEditingUser(null);
                    else router.refresh();
                },
                user: editingUser
            }, void 0, false, {
                fileName: "[project]/components/dashboard/users-list.tsx",
                lineNumber: 194,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialog"], {
                open: !!removingUser,
                onOpenChange: (open)=>!open && setRemovingUser(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                    children: "Remover Usuário"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    children: [
                                        "Tem certeza que deseja remover ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: removingUser?.name || removingUser?.email
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                            lineNumber: 209,
                                            columnNumber: 46
                                        }, this),
                                        " da empresa ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: removingUser?.company.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                            lineNumber: 209,
                                            columnNumber: 118
                                        }, this),
                                        "?",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/components/dashboard/users-list.tsx",
                                            lineNumber: 210,
                                            columnNumber: 21
                                        }, this),
                                        "Esta ação não pode ser desfeita."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/users-list.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    disabled: loading === removingUser?.id,
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                    onClick: handleRemoveUser,
                                    disabled: loading === removingUser?.id,
                                    className: "bg-destructive hover:bg-destructive/90",
                                    children: loading === removingUser?.id ? 'Removendo...' : 'Remover'
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard/users-list.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dashboard/users-list.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dashboard/users-list.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dashboard/users-list.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_b4974259._.js.map