module.exports = [
"[project]/app/actions/assessments.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002bf3d939da3b85ebb0306bb7d29556864af8cd70":"getTemplates","4037a89d8fa9c660dd0a02a4c9d4d5ab7b8e9cf369":"deleteAssessment","4043c312b6cdd900965370c770d8e05693dc3790b7":"getAssessments","4069a0a5766854ddfb4e8edec306a96d4b56ce8a01":"getAssessmentById","40edcab69aa939fd793ca19edced638294fb9e235e":"submitAssessment","60d141a060a702c2cc20887d53ff45c0ef22d3f1fd":"createAssessment","7cfceb697006ef40eee4d98b9101ed33ec22a5f7fe":"saveAnswer"},"",""] */ __turbopack_context__.s([
    "createAssessment",
    ()=>createAssessment,
    "deleteAssessment",
    ()=>deleteAssessment,
    "getAssessmentById",
    ()=>getAssessmentById,
    "getAssessments",
    ()=>getAssessments,
    "getTemplates",
    ()=>getTemplates,
    "saveAnswer",
    ()=>saveAnswer,
    "submitAssessment",
    ()=>submitAssessment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function createAssessment(companyId, formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const role = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserRole"])(user.id, companyId);
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    if (!isAdmin && ![
        'COMPANY_ADMIN',
        'ENGINEER'
    ].includes(role || '')) {
        return {
            error: 'Sem permissão para criar diagnósticos'
        };
    }
    const title = formData.get('title');
    const description = formData.get('description');
    const templateId = formData.get('templateId');
    if (!title) {
        return {
            error: 'Título é obrigatório'
        };
    }
    try {
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.create({
            data: {
                companyId,
                createdBy: user.id,
                title,
                description,
                templateId: templateId || undefined,
                status: 'DRAFT'
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/diagnostics');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/dashboard/diagnostics/${assessment.id}`);
    } catch (error) {
        console.error('Erro ao criar diagnóstico:', error);
        return {
            error: 'Erro ao criar diagnóstico'
        };
    }
}
async function getAssessments(companyId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
        let assessments;
        if (isAdmin) {
            assessments = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findMany({
                where: companyId ? {
                    companyId
                } : undefined,
                include: {
                    company: true,
                    scores: true,
                    _count: {
                        select: {
                            answers: true,
                            scores: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } else {
            const memberships = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findMany({
                where: {
                    userId: user.id,
                    status: 'ACTIVE'
                },
                select: {
                    companyId: true
                }
            });
            const companyIds = memberships.map((m)=>m.companyId);
            if (companyId && !companyIds.includes(companyId)) {
                return {
                    error: 'Sem permissão para acessar diagnósticos desta empresa'
                };
            }
            assessments = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findMany({
                where: {
                    companyId: companyId ? companyId : {
                        in: companyIds
                    }
                },
                include: {
                    company: true,
                    scores: true,
                    _count: {
                        select: {
                            answers: true,
                            scores: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }
        return {
            success: true,
            assessments
        };
    } catch (error) {
        console.error('Erro ao buscar diagnósticos:', error);
        return {
            error: 'Erro ao buscar diagnósticos'
        };
    }
}
async function getAssessmentById(assessmentId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            },
            include: {
                company: true,
                template: {
                    include: {
                        sections: {
                            include: {
                                questions: true
                            }
                        }
                    }
                },
                answers: {
                    include: {
                        question: true
                    }
                },
                scores: true,
                findings: true,
                evidences: true,
                actionPlans: true
            }
        });
        if (!assessment) {
            return {
                error: 'Diagnóstico não encontrado'
            };
        }
        const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
        const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findFirst({
            where: {
                userId: user.id,
                companyId: assessment.companyId,
                status: 'ACTIVE'
            }
        });
        if (!isAdmin && !membership) {
            return {
                error: 'Sem permissão para acessar este diagnóstico'
            };
        }
        return {
            success: true,
            assessment
        };
    } catch (error) {
        console.error('Erro ao buscar diagnóstico:', error);
        return {
            error: 'Erro ao buscar diagnóstico'
        };
    }
}
async function getTemplates() {
    try {
        const templates = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].diagnosticTemplate.findMany({
            where: {
                status: 'PUBLISHED'
            },
            include: {
                sections: {
                    include: {
                        questions: {
                            where: {
                                active: true,
                                approved: true
                            },
                            orderBy: {
                                createdAt: 'asc'
                            }
                        }
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return {
            success: true,
            templates
        };
    } catch (error) {
        console.error('Erro ao buscar templates:', error);
        return {
            error: 'Erro ao buscar templates'
        };
    }
}
async function saveAnswer(assessmentId, questionId, value, justification, evidenceUrls) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            }
        });
        if (!assessment) {
            return {
                error: 'Diagnóstico não encontrado'
            };
        }
        const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
        const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findFirst({
            where: {
                userId: user.id,
                companyId: assessment.companyId,
                status: 'ACTIVE'
            }
        });
        if (!isAdmin && !membership) {
            return {
                error: 'Sem permissão para acessar este diagnóstico'
            };
        }
        if (assessment.status === 'COMPLETED') {
            return {
                error: 'Este diagnóstico já foi finalizado'
            };
        }
        const answer = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessmentAnswer.upsert({
            where: {
                assessmentId_questionId: {
                    assessmentId,
                    questionId
                }
            },
            create: {
                assessmentId,
                questionId,
                userId: user.id,
                value,
                justification,
                evidenceUrls: evidenceUrls || []
            },
            update: {
                value,
                userId: user.id,
                justification,
                evidenceUrls: evidenceUrls || []
            }
        });
        if (assessment.status === 'DRAFT') {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.update({
                where: {
                    id: assessmentId
                },
                data: {
                    status: 'IN_PROGRESS',
                    startedAt: new Date()
                }
            });
        }
        return {
            success: true,
            answer
        };
    } catch (error) {
        console.error('Erro ao salvar resposta:', error);
        return {
            error: 'Erro ao salvar resposta'
        };
    }
}
async function submitAssessment(assessmentId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            },
            include: {
                template: {
                    include: {
                        sections: {
                            include: {
                                questions: {
                                    where: {
                                        active: true
                                    }
                                }
                            }
                        }
                    }
                },
                answers: {
                    include: {
                        question: true
                    }
                }
            }
        });
        if (!assessment) {
            return {
                error: 'Diagnóstico não encontrado'
            };
        }
        if (!assessment.template) {
            return {
                error: 'Este diagnóstico não possui um template associado'
            };
        }
        const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
        const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findFirst({
            where: {
                userId: user.id,
                companyId: assessment.companyId,
                status: 'ACTIVE'
            }
        });
        if (!isAdmin && !membership) {
            return {
                error: 'Sem permissão para submeter este diagnóstico'
            };
        }
        // Calcular scores por seção usando o novo schema
        const totalQuestions = assessment.template.sections.reduce((sum, section)=>sum + section.questions.length, 0);
        if (assessment.answers.length < totalQuestions) {
            return {
                error: `Por favor, responda todas as ${totalQuestions} perguntas antes de finalizar`
            };
        }
        const sectionScores = [];
        for (const section of assessment.template.sections){
            const sectionAnswers = assessment.answers.filter((a)=>section.questions.some((q)=>q.id === a.questionId));
            if (sectionAnswers.length === 0) continue;
            // Calcular score ponderado da seção
            let rawScore = 0;
            let totalWeight = 0;
            for (const answer of sectionAnswers){
                const question = section.questions.find((q)=>q.id === answer.questionId);
                if (!question) continue;
                rawScore += answer.value * question.weight;
                totalWeight += question.weight * (question.type === 'BOOLEAN' ? 1 : 5);
            }
            const weightedScore = totalWeight > 0 ? rawScore / totalWeight * 100 : 0;
            const level = Math.min(5, Math.max(1, Math.ceil(weightedScore / 20)));
            sectionScores.push({
                sectionId: section.id,
                rawScore,
                weightedScore,
                level
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessmentScore.upsert({
                where: {
                    assessmentId_sectionId: {
                        assessmentId,
                        sectionId: section.id
                    }
                },
                create: {
                    assessmentId,
                    sectionId: section.id,
                    rawScore,
                    weightedScore,
                    level
                },
                update: {
                    rawScore,
                    weightedScore,
                    level
                }
            });
        }
        // Calcular overall score (média ponderada de todas as seções)
        const overallScore = sectionScores.length > 0 ? sectionScores.reduce((sum, s)=>sum + s.weightedScore, 0) / sectionScores.length : 0;
        const overallLevel = Math.min(5, Math.max(1, Math.ceil(overallScore / 20)));
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.update({
            where: {
                id: assessmentId
            },
            data: {
                status: 'SCORED',
                submittedAt: new Date(),
                scoredAt: new Date(),
                overallScore,
                overallLevel
            }
        });
        // Gerar achados automaticamente baseados nas respostas não conformes
        const { generateFindings } = await __turbopack_context__.A("[project]/app/actions/findings.ts [app-rsc] (ecmascript, async loader)");
        await generateFindings(assessmentId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/diagnostics');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/diagnostics/${assessmentId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error('Erro ao submeter diagnóstico:', error);
        return {
            error: 'Erro ao submeter diagnóstico'
        };
    }
}
async function deleteAssessment(assessmentId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            }
        });
        if (!assessment) {
            return {
                error: 'Diagnóstico não encontrado'
            };
        }
        const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
        const role = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserRole"])(user.id, assessment.companyId);
        if (!isAdmin && ![
            'COMPANY_ADMIN',
            'ENGINEER'
        ].includes(role || '')) {
            return {
                error: 'Sem permissão para deletar este diagnóstico'
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.delete({
            where: {
                id: assessmentId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/diagnostics');
        return {
            success: true
        };
    } catch (error) {
        console.error('Erro ao deletar diagnóstico:', error);
        return {
            error: 'Erro ao deletar diagnóstico'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createAssessment,
    getAssessments,
    getAssessmentById,
    getTemplates,
    saveAnswer,
    submitAssessment,
    deleteAssessment
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAssessment, "60d141a060a702c2cc20887d53ff45c0ef22d3f1fd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAssessments, "4043c312b6cdd900965370c770d8e05693dc3790b7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAssessmentById, "4069a0a5766854ddfb4e8edec306a96d4b56ce8a01", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTemplates, "002bf3d939da3b85ebb0306bb7d29556864af8cd70", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveAnswer, "7cfceb697006ef40eee4d98b9101ed33ec22a5f7fe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitAssessment, "40edcab69aa939fd793ca19edced638294fb9e235e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAssessment, "4037a89d8fa9c660dd0a02a4c9d4d5ab7b8e9cf369", null);
}),
"[project]/app/actions/companies.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009c26f50f2c4aa3cfb432f0a637c20c42e3c32293":"getCompanies","400cb6cc10367b3e4d114512e01298c76d9835b5f8":"createCompany","40c81ccd92d0d0fded1217a33c701f53eff4a7a1ea":"deleteCompany","40f846fa049a2ceb9fdad8c1265b72efe299ad7bd6":"getCompanyById","60ba2307d226d4f5f21166085f26872b985071584f":"updateCompany"},"",""] */ __turbopack_context__.s([
    "createCompany",
    ()=>createCompany,
    "deleteCompany",
    ()=>deleteCompany,
    "getCompanies",
    ()=>getCompanies,
    "getCompanyById",
    ()=>getCompanyById,
    "updateCompany",
    ()=>updateCompany
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function createCompany(formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    if (!isAdmin) {
        return {
            error: 'Apenas administradores da plataforma podem criar empresas'
        };
    }
    const name = formData.get('name');
    const cnpj = formData.get('cnpj');
    if (!name || !cnpj) {
        return {
            error: 'Nome e CNPJ são obrigatórios'
        };
    }
    try {
        const company = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].company.create({
            data: {
                name,
                cnpj
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/companies');
        return {
            success: true,
            company
        };
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
        return {
            error: 'Erro ao criar empresa. Verifique se o CNPJ já não está cadastrado.'
        };
    }
}
async function updateCompany(companyId, formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    const role = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserRole"])(user.id, companyId);
    if (!isAdmin && role !== 'COMPANY_ADMIN') {
        return {
            error: 'Sem permissão para editar esta empresa'
        };
    }
    const name = formData.get('name');
    const cnpj = formData.get('cnpj');
    if (!name || !cnpj) {
        return {
            error: 'Nome e CNPJ são obrigatórios'
        };
    }
    try {
        const company = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].company.update({
            where: {
                id: companyId
            },
            data: {
                name,
                cnpj
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/companies');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/companies/${companyId}`);
        return {
            success: true,
            company
        };
    } catch (error) {
        console.error('Erro ao atualizar empresa:', error);
        return {
            error: 'Erro ao atualizar empresa'
        };
    }
}
async function deleteCompany(companyId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    if (!isAdmin) {
        return {
            error: 'Apenas administradores da plataforma podem deletar empresas'
        };
    }
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].company.delete({
            where: {
                id: companyId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/companies');
        return {
            success: true
        };
    } catch (error) {
        console.error('Erro ao deletar empresa:', error);
        return {
            error: 'Erro ao deletar empresa'
        };
    }
}
async function getCompanies() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    try {
        let companies;
        if (isAdmin) {
            companies = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].company.findMany({
                include: {
                    _count: {
                        select: {
                            memberships: true,
                            assessments: true,
                            actionPlans: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } else {
            const memberships = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findMany({
                where: {
                    userId: user.id,
                    status: 'ACTIVE'
                },
                include: {
                    company: {
                        include: {
                            _count: {
                                select: {
                                    memberships: true,
                                    assessments: true,
                                    actionPlans: true
                                }
                            }
                        }
                    }
                }
            });
            companies = memberships.map((m)=>m.company);
        }
        return {
            success: true,
            companies
        };
    } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        return {
            error: 'Erro ao buscar empresas'
        };
    }
}
async function getCompanyById(companyId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    const role = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserRole"])(user.id, companyId);
    if (!isAdmin && !role) {
        return {
            error: 'Sem permissão para acessar esta empresa'
        };
    }
    try {
        const company = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].company.findUnique({
            where: {
                id: companyId
            },
            include: {
                memberships: {
                    include: {
                        company: true
                    }
                },
                assessments: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 5
                },
                _count: {
                    select: {
                        memberships: true,
                        assessments: true,
                        actionPlans: true
                    }
                }
            }
        });
        if (!company) {
            return {
                error: 'Empresa não encontrada'
            };
        }
        return {
            success: true,
            company
        };
    } catch (error) {
        console.error('Erro ao buscar empresa:', error);
        return {
            error: 'Erro ao buscar empresa'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanies,
    getCompanyById
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCompany, "400cb6cc10367b3e4d114512e01298c76d9835b5f8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCompany, "60ba2307d226d4f5f21166085f26872b985071584f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCompany, "40c81ccd92d0d0fded1217a33c701f53eff4a7a1ea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompanies, "009c26f50f2c4aa3cfb432f0a637c20c42e3c32293", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompanyById, "40f846fa049a2ceb9fdad8c1265b72efe299ad7bd6", null);
}),
"[project]/app/actions/templates.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00684ee0a26a988fdf03b6b89fa88267aaf4f6a26d":"getAllTemplates","009a747fe65fc0cb39e85cb386ce99e2a853343b53":"getPublishedTemplates","4059713e9d9bb8b94c7ed601c0d6dbebb7a50d29ba":"deleteTemplate","40733b531254e2977bb25960d28d18a481466a1aea":"publishTemplate","40985833c4310d0f61d26f2506d40ac7441eb33fdc":"getTemplateById","608fe72c7ef0d0cdb4cbb7a67de22bf1e0e4f506ee":"updateTemplateStatus","60b1c0b71341e930cdb3cf7ccf817c89cb99a17d5c":"applyTemplateToAssessment","60f741c09d49b0dde20d9909423dc3aba7d6743796":"updateTemplate"},"",""] */ __turbopack_context__.s([
    "applyTemplateToAssessment",
    ()=>applyTemplateToAssessment,
    "deleteTemplate",
    ()=>deleteTemplate,
    "getAllTemplates",
    ()=>getAllTemplates,
    "getPublishedTemplates",
    ()=>getPublishedTemplates,
    "getTemplateById",
    ()=>getTemplateById,
    "publishTemplate",
    ()=>publishTemplate,
    "updateTemplate",
    ()=>updateTemplate,
    "updateTemplateStatus",
    ()=>updateTemplateStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getAllTemplates() {
    try {
        const templates = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].diagnosticTemplate.findMany({
            include: {
                sections: {
                    include: {
                        questions: {
                            where: {
                                active: true
                            },
                            orderBy: {
                                createdAt: 'asc'
                            }
                        }
                    },
                    orderBy: {
                        order: 'asc'
                    }
                },
                _count: {
                    select: {
                        sections: true,
                        assessments: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return {
            success: true,
            templates
        };
    } catch (error) {
        console.error('Erro ao buscar templates:', error);
        return {
            error: 'Erro ao buscar templates'
        };
    }
}
async function getTemplateById(templateId) {
    try {
        const template = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].diagnosticTemplate.findUnique({
            where: {
                id: templateId
            },
            include: {
                sections: {
                    include: {
                        questions: {
                            where: {
                                active: true
                            },
                            orderBy: {
                                createdAt: 'asc'
                            }
                        }
                    },
                    orderBy: {
                        order: 'asc'
                    }
                },
                _count: {
                    select: {
                        assessments: true
                    }
                }
            }
        });
        if (!template) {
            return {
                error: 'Template não encontrado'
            };
        }
        return {
            success: true,
            template
        };
    } catch (error) {
        console.error('Erro ao buscar template:', error);
        return {
            error: 'Erro ao buscar template'
        };
    }
}
async function updateTemplateStatus(templateId, status) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    if (!isAdmin) {
        return {
            error: 'Apenas administradores podem alterar o status de templates'
        };
    }
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].diagnosticTemplate.update({
            where: {
                id: templateId
            },
            data: {
                status
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/templates');
        return {
            success: true
        };
    } catch (error) {
        console.error('Erro ao atualizar status do template:', error);
        return {
            error: 'Erro ao atualizar status do template'
        };
    }
}
async function deleteTemplate(templateId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    if (!isAdmin) {
        return {
            error: 'Apenas administradores podem excluir templates'
        };
    }
    try {
        // Verificar se há assessments usando este template
        const assessmentCount = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.count({
            where: {
                templateId
            }
        });
        if (assessmentCount > 0) {
            return {
                error: `Não é possível excluir. Existem ${assessmentCount} diagnósticos usando este template.`
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].diagnosticTemplate.delete({
            where: {
                id: templateId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/templates');
        return {
            success: true
        };
    } catch (error) {
        console.error('Erro ao excluir template:', error);
        return {
            error: 'Erro ao excluir template'
        };
    }
}
async function getPublishedTemplates() {
    try {
        const templates = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].diagnosticTemplate.findMany({
            where: {
                status: 'PUBLISHED'
            },
            select: {
                id: true,
                name: true,
                description: true,
                type: true,
                _count: {
                    select: {
                        sections: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });
        return {
            success: true,
            templates
        };
    } catch (error) {
        console.error('Erro ao buscar templates publicados:', error);
        return {
            error: 'Erro ao buscar templates publicados'
        };
    }
}
async function publishTemplate(templateId) {
    return updateTemplateStatus(templateId, 'PUBLISHED');
}
async function updateTemplate(templateId, data) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
    if (!isAdmin) {
        return {
            error: 'Apenas administradores podem editar templates'
        };
    }
    try {
        // Verificar se template existe
        const template = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].diagnosticTemplate.findUnique({
            where: {
                id: templateId
            },
            include: {
                sections: {
                    include: {
                        questions: true
                    }
                }
            }
        });
        if (!template) {
            return {
                error: 'Template não encontrado'
            };
        }
        // Atualizar template e suas seções/perguntas
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            // Atualizar informações básicas do template
            await tx.diagnosticTemplate.update({
                where: {
                    id: templateId
                },
                data: {
                    name: data.name,
                    description: data.description
                }
            });
            // IDs de seções e perguntas que devem ser mantidos
            const sectionIdsToKeep = data.sections.filter((s)=>s.id).map((s)=>s.id);
            const questionIdsToKeep = data.sections.flatMap((s)=>s.questions.filter((q)=>q.id).map((q)=>q.id));
            // Deletar seções que foram removidas
            await tx.diagnosticSection.deleteMany({
                where: {
                    templateId,
                    id: {
                        notIn: sectionIdsToKeep
                    }
                }
            });
            // Processar cada seção
            for (const section of data.sections){
                if (section.id) {
                    // Atualizar seção existente
                    await tx.diagnosticSection.update({
                        where: {
                            id: section.id
                        },
                        data: {
                            title: section.title,
                            order: section.order
                        }
                    });
                    // Deletar perguntas removidas desta seção
                    await tx.diagnosticQuestion.deleteMany({
                        where: {
                            sectionId: section.id,
                            id: {
                                notIn: section.questions.filter((q)=>q.id).map((q)=>q.id)
                            }
                        }
                    });
                    // Processar perguntas
                    for (const question of section.questions){
                        if (question.id) {
                            // Atualizar pergunta existente
                            await tx.diagnosticQuestion.update({
                                where: {
                                    id: question.id
                                },
                                data: {
                                    text: question.text,
                                    type: question.type,
                                    weight: question.weight,
                                    reference: question.reference,
                                    requiresJustification: question.requiresJustification
                                }
                            });
                        } else {
                            // Criar nova pergunta
                            await tx.diagnosticQuestion.create({
                                data: {
                                    sectionId: section.id,
                                    text: question.text,
                                    type: question.type,
                                    weight: question.weight,
                                    reference: question.reference,
                                    requiresJustification: question.requiresJustification
                                }
                            });
                        }
                    }
                } else {
                    // Criar nova seção com suas perguntas
                    await tx.diagnosticSection.create({
                        data: {
                            templateId,
                            title: section.title,
                            order: section.order,
                            questions: {
                                create: section.questions.map((q)=>({
                                        text: q.text,
                                        type: q.type,
                                        weight: q.weight,
                                        reference: q.reference,
                                        requiresJustification: q.requiresJustification
                                    }))
                            }
                        }
                    });
                }
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/templates');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/templates/${templateId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error('Erro ao atualizar template:', error);
        return {
            error: 'Erro ao atualizar template'
        };
    }
}
async function applyTemplateToAssessment(assessmentId, templateId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        // Verificar se o assessment existe e se o usuário tem permissão
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            },
            select: {
                companyId: true,
                status: true,
                templateId: true
            }
        });
        if (!assessment) {
            return {
                error: 'Diagnóstico não encontrado'
            };
        }
        if (assessment.status !== 'DRAFT') {
            return {
                error: 'Só é possível aplicar template em diagnósticos com status DRAFT'
            };
        }
        if (assessment.templateId) {
            return {
                error: 'Este diagnóstico já possui um template associado'
            };
        }
        const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
        const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findFirst({
            where: {
                userId: user.id,
                companyId: assessment.companyId,
                status: 'ACTIVE'
            }
        });
        if (!isAdmin && !membership) {
            return {
                error: 'Sem permissão para modificar este diagnóstico'
            };
        }
        // Buscar o template com seções e perguntas para validação
        const template = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].diagnosticTemplate.findUnique({
            where: {
                id: templateId
            },
            include: {
                sections: {
                    include: {
                        questions: {
                            where: {
                                active: true
                            }
                        }
                    }
                }
            }
        });
        if (!template) {
            return {
                error: 'Template não encontrado'
            };
        }
        if (template.status !== 'PUBLISHED') {
            return {
                error: 'Apenas templates publicados podem ser aplicados'
            };
        }
        // Associar o template ao assessment
        // As seções e perguntas já existem no template e serão acessadas via relacionamento
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.update({
            where: {
                id: assessmentId
            },
            data: {
                templateId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/diagnostics/${assessmentId}`);
        return {
            success: true,
            sectionsCount: template.sections.length,
            questionsCount: template.sections.reduce((sum, s)=>sum + s.questions.length, 0)
        };
    } catch (error) {
        console.error('Erro ao aplicar template:', error);
        return {
            error: 'Erro ao aplicar template ao diagnóstico'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAllTemplates,
    getTemplateById,
    updateTemplateStatus,
    deleteTemplate,
    getPublishedTemplates,
    publishTemplate,
    updateTemplate,
    applyTemplateToAssessment
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllTemplates, "00684ee0a26a988fdf03b6b89fa88267aaf4f6a26d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTemplateById, "40985833c4310d0f61d26f2506d40ac7441eb33fdc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTemplateStatus, "608fe72c7ef0d0cdb4cbb7a67de22bf1e0e4f506ee", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTemplate, "4059713e9d9bb8b94c7ed601c0d6dbebb7a50d29ba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPublishedTemplates, "009a747fe65fc0cb39e85cb386ce99e2a853343b53", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(publishTemplate, "40733b531254e2977bb25960d28d18a481466a1aea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTemplate, "60f741c09d49b0dde20d9909423dc3aba7d6743796", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(applyTemplateToAssessment, "60b1c0b71341e930cdb3cf7ccf817c89cb99a17d5c", null);
}),
"[project]/.next-internal/server/app/dashboard/diagnostics/new/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/assessments.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/companies.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/actions/templates.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/assessments.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$companies$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/companies.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/templates.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/dashboard/diagnostics/new/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/assessments.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/companies.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/actions/templates.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0091763d6f80e88135cfb100958db3e5ae87d9a6cf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "009a747fe65fc0cb39e85cb386ce99e2a853343b53",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedTemplates"],
    "009c26f50f2c4aa3cfb432f0a637c20c42e3c32293",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$companies$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompanies"],
    "4026d94dfb4c4c980b9308dc8d58accf99f029ae8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signup"],
    "40c968a099a629990f9b0371616f2f87940f850ecd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40dfc9788b51d601428dba7b36c25153a35bb09e9c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePassword"],
    "40fc31c8691714bac2b4cfc21b4515fc4b1f7b791a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetPassword"],
    "60d141a060a702c2cc20887d53ff45c0ef22d3f1fd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAssessment"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$diagnostics$2f$new$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$companies$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/diagnostics/new/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/actions/assessments.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/actions/companies.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/app/actions/templates.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/assessments.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$companies$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/companies.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/templates.ts [app-rsc] (ecmascript)");
}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/dashboard/diagnostics/new/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/dashboard/diagnostics/new/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/dashboard/diagnostics/new/page.tsx <module evaluation>", "default");
}),
"[project]/app/dashboard/diagnostics/new/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/dashboard/diagnostics/new/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/dashboard/diagnostics/new/page.tsx", "default");
}),
"[project]/app/dashboard/diagnostics/new/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$diagnostics$2f$new$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/dashboard/diagnostics/new/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$diagnostics$2f$new$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/dashboard/diagnostics/new/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$diagnostics$2f$new$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/dashboard/diagnostics/new/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/diagnostics/new/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e4f68cdf._.js.map