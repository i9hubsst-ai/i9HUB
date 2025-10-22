module.exports = [
"[project]/app/actions/assessments.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00b21ddf57dd312c4af936ec641c19a29fdb35fa5c":"getTemplates","403247707d786bda790ed57ac32004e1d350842375":"getAssessments","405d4521dce6473b8bc5adc8dd30bd54518330fdbe":"submitAssessment","406431a25254b80d00cbac5b53d11835ebd6f9b097":"deleteAssessment","406f830bbb4aa55b86d24f1530742c44f3cd80063c":"getAssessmentById","6029e9454862716b1701260050fc791d00058459ce":"createAssessment","7c9621f32fabf685ce15d97f61e1eed06098940321":"saveAnswer"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
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
        return {
            success: true,
            assessmentId: assessment.id
        };
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
                        question: true,
                        evidences: true
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
        // Buscar informações do usuário criador
        let createdByUser = null;
        try {
            const { createClient } = await __turbopack_context__.A("[project]/lib/supabase/server.ts [app-rsc] (ecmascript, async loader)");
            const supabase = await createClient();
            const { data: userData } = await supabase.auth.admin.getUserById(assessment.createdBy);
            createdByUser = userData?.user ? {
                id: userData.user.id,
                email: userData.user.email || 'Desconhecido',
                name: userData.user.user_metadata?.name || userData.user.email?.split('@')[0] || 'Usuário'
            } : null;
        } catch (error) {
            console.error('Erro ao buscar dados do usuário criador:', error);
        }
        return {
            success: true,
            assessment: {
                ...assessment,
                createdByUser
            }
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAssessment, "6029e9454862716b1701260050fc791d00058459ce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAssessments, "403247707d786bda790ed57ac32004e1d350842375", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAssessmentById, "406f830bbb4aa55b86d24f1530742c44f3cd80063c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTemplates, "00b21ddf57dd312c4af936ec641c19a29fdb35fa5c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveAnswer, "7c9621f32fabf685ce15d97f61e1eed06098940321", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitAssessment, "405d4521dce6473b8bc5adc8dd30bd54518330fdbe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAssessment, "406431a25254b80d00cbac5b53d11835ebd6f9b097", null);
}),
"[project]/app/actions/findings.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4045692c9a41cc3a2c1e5074d736e493a32b2ec495":"getFindings","405a590ce4d96d3edda358d8de10e5aa84e5e359dc":"deleteFinding","40972f606b3ccdbb4cb96393818a9bb134ad7e9325":"generateFindings"},"",""] */ __turbopack_context__.s([
    "deleteFinding",
    ()=>deleteFinding,
    "generateFindings",
    ()=>generateFindings,
    "getFindings",
    ()=>getFindings
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
async function generateFindings(assessmentId) {
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
                        question: {
                            include: {
                                section: true
                            }
                        }
                    }
                }
            }
        });
        if (!assessment || !assessment.template) {
            return {
                error: 'Diagnóstico ou template não encontrado'
            };
        }
        // Verificar permissões
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
                error: 'Sem permissão para gerar achados neste diagnóstico'
            };
        }
        // Limpar achados existentes deste assessment
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].finding.deleteMany({
            where: {
                assessmentId
            }
        });
        const findings = [];
        // Regra: gerar achado para boolean=0 ou score≤3
        for (const answer of assessment.answers){
            const isNonConformant = answer.question.type === 'BOOLEAN' && answer.value === 0 || answer.question.type === 'SCORE' && answer.value <= 3;
            if (isNonConformant) {
                // Determinar severidade baseada no valor
                let severity;
                if (answer.question.type === 'BOOLEAN' && answer.value === 0) {
                    severity = 'HIGH'; // Não conformidade crítica
                } else if (answer.value <= 2) {
                    severity = 'HIGH'; // Muito baixo
                } else if (answer.value === 3) {
                    severity = 'MEDIUM'; // Oportunidade de melhoria
                } else {
                    severity = 'LOW'; // Observação
                }
                const finding = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].finding.create({
                    data: {
                        assessmentId,
                        sectionTitle: answer.question.section.title,
                        questionText: answer.question.text,
                        questionType: answer.question.type,
                        value: answer.value,
                        reference: answer.question.reference,
                        justification: answer.justification,
                        severity
                    }
                });
                findings.push(finding);
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/diagnostics/${assessmentId}`);
        return {
            success: true,
            findingsCount: findings.length
        };
    } catch (error) {
        console.error('Erro ao gerar achados:', error);
        return {
            error: 'Erro ao gerar achados'
        };
    }
}
async function getFindings(assessmentId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        // Verificar se o usuário tem acesso ao assessment
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            },
            select: {
                companyId: true
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
        const findings = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].finding.findMany({
            where: {
                assessmentId
            },
            orderBy: [
                {
                    severity: 'desc'
                },
                {
                    createdAt: 'asc'
                }
            ]
        });
        return {
            success: true,
            findings
        };
    } catch (error) {
        console.error('Erro ao buscar achados:', error);
        return {
            error: 'Erro ao buscar achados'
        };
    }
}
async function deleteFinding(findingId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        // Buscar o finding para verificar permissões
        const finding = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].finding.findUnique({
            where: {
                id: findingId
            },
            include: {
                assessment: {
                    select: {
                        companyId: true
                    }
                }
            }
        });
        if (!finding) {
            return {
                error: 'Achado não encontrado'
            };
        }
        const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(user.id);
        const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findFirst({
            where: {
                userId: user.id,
                companyId: finding.assessment.companyId,
                status: 'ACTIVE'
            }
        });
        if (!isAdmin && !membership) {
            return {
                error: 'Sem permissão para excluir este achado'
            };
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].finding.delete({
            where: {
                id: findingId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/diagnostics');
        return {
            success: true
        };
    } catch (error) {
        console.error('Erro ao excluir achado:', error);
        return {
            error: 'Erro ao excluir achado'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateFindings,
    getFindings,
    deleteFinding
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateFindings, "40972f606b3ccdbb4cb96393818a9bb134ad7e9325", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFindings, "4045692c9a41cc3a2c1e5074d736e493a32b2ec495", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteFinding, "405a590ce4d96d3edda358d8de10e5aa84e5e359dc", null);
}),
"[project]/app/actions/evidence.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40c372ca2fa5f01e6f6286be7f056d83bc22d797a8":"getEvidencesByAnswer","6094b48d55bfafc1cd01a6d2874378415d21fc3b52":"deleteEvidence","704dc6ca83085b625b1b4d2abb51dc7276f80cde9b":"uploadEvidence"},"",""] */ __turbopack_context__.s([
    "deleteEvidence",
    ()=>deleteEvidence,
    "getEvidencesByAnswer",
    ()=>getEvidencesByAnswer,
    "uploadEvidence",
    ()=>uploadEvidence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function uploadEvidence(assessmentId, answerId, formData) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        // Verificar autorização multi-tenant
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            },
            include: {
                answers: {
                    where: {
                        id: answerId
                    },
                    select: {
                        id: true
                    }
                }
            }
        });
        if (!assessment) {
            return {
                error: 'Diagnóstico não encontrado'
            };
        }
        if (assessment.answers.length === 0) {
            return {
                error: 'Resposta não encontrada neste diagnóstico'
            };
        }
        const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findFirst({
            where: {
                userId: user.id,
                companyId: assessment.companyId,
                status: 'ACTIVE'
            }
        });
        if (!membership) {
            return {
                error: 'Sem permissão para fazer upload de evidências neste diagnóstico'
            };
        }
        const file = formData.get('file');
        if (!file) {
            return {
                error: 'Nenhum arquivo fornecido'
            };
        }
        // Validar tamanho (máx 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return {
                error: 'Arquivo muito grande. Máximo: 10MB'
            };
        }
        // Validar tipo
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        if (!allowedTypes.includes(file.type)) {
            return {
                error: 'Tipo de arquivo não permitido. Use imagens, PDF ou documentos Office.'
            };
        }
        // Converter para base64 (temporário - posteriormente migrar para Supabase Storage)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;
        // Salvar no banco
        const evidence = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].evidence.create({
            data: {
                assessmentId,
                answerId,
                fileName: file.name,
                fileUrl: dataUrl,
                fileSize: file.size,
                mimeType: file.type,
                uploadedBy: user.id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/diagnostics/${assessmentId}`);
        return {
            success: true,
            evidence
        };
    } catch (error) {
        console.error('Erro ao fazer upload de evidência:', error);
        return {
            error: 'Erro ao fazer upload do arquivo'
        };
    }
}
async function deleteEvidence(evidenceId, assessmentId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        // Verificar autorização multi-tenant PRIMEIRO
        const evidence = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].evidence.findUnique({
            where: {
                id: evidenceId
            },
            include: {
                assessment: {
                    select: {
                        companyId: true
                    }
                }
            }
        });
        if (!evidence) {
            return {
                error: 'Evidência não encontrada'
            };
        }
        // Garantir que o usuário tem membership ativa na empresa
        const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findFirst({
            where: {
                userId: user.id,
                companyId: evidence.assessment.companyId,
                status: 'ACTIVE'
            }
        });
        if (!membership) {
            return {
                error: 'Sem permissão para excluir esta evidência'
            };
        }
        // Verificar se pode deletar (apenas o próprio uploader ou admin/engineer)
        if (evidence.uploadedBy !== user.id) {
            if (![
                'COMPANY_ADMIN',
                'ENGINEER'
            ].includes(membership.role)) {
                return {
                    error: 'Apenas administradores ou engenheiros podem excluir evidências de outros usuários'
                };
            }
        }
        // TODO: Se estiver usando Supabase Storage, deletar arquivo de lá também
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].evidence.delete({
            where: {
                id: evidenceId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/diagnostics/${assessmentId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error('Erro ao excluir evidência:', error);
        return {
            error: 'Erro ao excluir evidência'
        };
    }
}
async function getEvidencesByAnswer(answerId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        // Verificar autorização multi-tenant
        const answer = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessmentAnswer.findUnique({
            where: {
                id: answerId
            },
            include: {
                assessment: {
                    select: {
                        companyId: true
                    }
                }
            }
        });
        if (!answer) {
            return {
                error: 'Resposta não encontrada'
            };
        }
        const membership = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].membership.findFirst({
            where: {
                userId: user.id,
                companyId: answer.assessment.companyId,
                status: 'ACTIVE'
            }
        });
        if (!membership) {
            return {
                error: 'Sem permissão para visualizar evidências deste diagnóstico'
            };
        }
        const evidences = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].evidence.findMany({
            where: {
                answerId
            },
            orderBy: {
                uploadedAt: 'desc'
            }
        });
        return {
            success: true,
            evidences
        };
    } catch (error) {
        console.error('Erro ao buscar evidências:', error);
        return {
            error: 'Erro ao buscar evidências'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    uploadEvidence,
    deleteEvidence,
    getEvidencesByAnswer
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadEvidence, "704dc6ca83085b625b1b4d2abb51dc7276f80cde9b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteEvidence, "6094b48d55bfafc1cd01a6d2874378415d21fc3b52", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEvidencesByAnswer, "40c372ca2fa5f01e6f6286be7f056d83bc22d797a8", null);
}),
"[project]/app/actions/action-plans.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b2be704e0b9dfd4fef34341d50aba090ede74e8b":"getActionPlans","70c6c8e938335bb3eb20b9dae2a5e7286a2a71c95d":"saveActionPlans"},"",""] */ __turbopack_context__.s([
    "getActionPlans",
    ()=>getActionPlans,
    "saveActionPlans",
    ()=>saveActionPlans
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
const priorityMap = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3
};
async function saveActionPlans(assessmentId, executiveSummary, actionPlans) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        // Verificar se o usuário tem acesso ao assessment
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            },
            select: {
                companyId: true,
                status: true
            }
        });
        if (!assessment) {
            return {
                error: 'Diagnóstico não encontrado'
            };
        }
        if (assessment.status !== 'SCORED') {
            return {
                error: 'Diagnóstico precisa estar finalizado'
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
                error: 'Sem permissão para salvar plano de ação deste diagnóstico'
            };
        }
        // Deletar planos de ação existentes (se houver)
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].actionPlan.deleteMany({
            where: {
                assessmentId,
                aiGenerated: true
            }
        });
        // Criar novos planos de ação
        const createdPlans = await Promise.all(actionPlans.map((plan, index)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].actionPlan.create({
                data: {
                    assessmentId,
                    companyId: assessment.companyId,
                    title: plan.title,
                    description: `${executiveSummary}\n\n---\n\n${plan.description}`,
                    priority: priorityMap[plan.priority],
                    dueDate: new Date(Date.now() + plan.estimatedDays * 24 * 60 * 60 * 1000),
                    status: 'PENDING',
                    reference: plan.reference,
                    createdBy: user.id,
                    ownerUserId: user.id,
                    aiGenerated: true
                }
            })));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/diagnostics/${assessmentId}`);
        return {
            success: true,
            count: createdPlans.length,
            executiveSummary
        };
    } catch (error) {
        console.error('Erro ao salvar planos de ação:', error);
        return {
            error: 'Erro ao salvar planos de ação'
        };
    }
}
const reversePriorityMap = {
    1: 'HIGH',
    2: 'MEDIUM',
    3: 'LOW'
};
async function getActionPlans(assessmentId) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        return {
            error: 'Não autorizado'
        };
    }
    try {
        // Verificar se o usuário tem acesso ao assessment
        const assessment = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].assessment.findUnique({
            where: {
                id: assessmentId
            },
            select: {
                companyId: true
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
        const actionPlans = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].actionPlan.findMany({
            where: {
                assessmentId,
                aiGenerated: true
            },
            orderBy: [
                {
                    priority: 'asc'
                },
                {
                    createdAt: 'asc'
                }
            ]
        });
        // Extrair executive summary da primeira action plan (se existir)
        let executiveSummary = '';
        const formattedPlans = actionPlans.map((plan)=>{
            const parts = plan.description.split('\n\n---\n\n');
            if (parts.length > 1 && !executiveSummary) {
                executiveSummary = parts[0];
            }
            return {
                ...plan,
                priority: reversePriorityMap[plan.priority] || 'MEDIUM',
                description: parts.length > 1 ? parts[1] : plan.description
            };
        });
        return {
            success: true,
            actionPlans: formattedPlans,
            executiveSummary
        };
    } catch (error) {
        console.error('Erro ao buscar planos de ação:', error);
        return {
            error: 'Erro ao buscar planos de ação'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    saveActionPlans,
    getActionPlans
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveActionPlans, "70c6c8e938335bb3eb20b9dae2a5e7286a2a71c95d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActionPlans, "40b2be704e0b9dfd4fef34341d50aba090ede74e8b", null);
}),
"[project]/.next-internal/server/app/dashboard/diagnostics/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/assessments.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/findings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/actions/evidence.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/app/actions/action-plans.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/assessments.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/findings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$evidence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/evidence.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$action$2d$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/action-plans.ts [app-rsc] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/dashboard/diagnostics/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/assessments.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/findings.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/actions/evidence.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/app/actions/action-plans.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00950cc05dd7ef75d756d4fc9e3c61e95c40b78bd2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "00b21ddf57dd312c4af936ec641c19a29fdb35fa5c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTemplates"],
    "4007405b346f399ce4be5dd0070cb05561df317291",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetPassword"],
    "403247707d786bda790ed57ac32004e1d350842375",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAssessments"],
    "4036ec0c913dcbeaa93ae2d1d48d6d5f0812fe978c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePassword"],
    "4045692c9a41cc3a2c1e5074d736e493a32b2ec495",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFindings"],
    "405a590ce4d96d3edda358d8de10e5aa84e5e359dc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteFinding"],
    "405d4521dce6473b8bc5adc8dd30bd54518330fdbe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitAssessment"],
    "406431a25254b80d00cbac5b53d11835ebd6f9b097",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAssessment"],
    "406f830bbb4aa55b86d24f1530742c44f3cd80063c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAssessmentById"],
    "40972f606b3ccdbb4cb96393818a9bb134ad7e9325",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateFindings"],
    "4097b7e15b157641eeefca97158f0031f460885053",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signup"],
    "40b2be704e0b9dfd4fef34341d50aba090ede74e8b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$action$2d$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActionPlans"],
    "40cb109470f3c3fc423b06a5eaaf60fde8af777dfe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "6029e9454862716b1701260050fc791d00058459ce",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAssessment"],
    "6094b48d55bfafc1cd01a6d2874378415d21fc3b52",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$evidence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteEvidence"],
    "704dc6ca83085b625b1b4d2abb51dc7276f80cde9b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$evidence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadEvidence"],
    "70c6c8e938335bb3eb20b9dae2a5e7286a2a71c95d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$action$2d$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveActionPlans"],
    "7c9621f32fabf685ce15d97f61e1eed06098940321",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveAnswer"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$diagnostics$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$evidence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$action$2d$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/diagnostics/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/actions/assessments.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/actions/findings.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/app/actions/evidence.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/app/actions/action-plans.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/assessments.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/findings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$evidence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/evidence.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$action$2d$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/action-plans.ts [app-rsc] (ecmascript)");
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
"[project]/components/dashboard/diagnostic-tabs.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DiagnosticTabs",
    ()=>DiagnosticTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DiagnosticTabs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DiagnosticTabs() from the server but DiagnosticTabs is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/dashboard/diagnostic-tabs.tsx <module evaluation>", "DiagnosticTabs");
}),
"[project]/components/dashboard/diagnostic-tabs.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DiagnosticTabs",
    ()=>DiagnosticTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DiagnosticTabs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DiagnosticTabs() from the server but DiagnosticTabs is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/dashboard/diagnostic-tabs.tsx", "DiagnosticTabs");
}),
"[project]/components/dashboard/diagnostic-tabs.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$tabs$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-tabs.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$tabs$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-tabs.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$tabs$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/dashboard/diagnostics/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DiagnosticDetailPage,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/assessments.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$tabs$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dashboard/diagnostic-tabs.tsx [app-rsc] (ecmascript)");
;
;
;
;
const revalidate = 0;
async function DiagnosticDetailPage({ params }) {
    const { id } = await params;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$assessments$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAssessmentById"])(id);
    if (result.error || !result.assessment) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-primary",
                    children: result.assessment.title
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/diagnostics/[id]/page.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/diagnostics/[id]/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dashboard$2f$diagnostic$2d$tabs$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagnosticTabs"], {
                assessment: result.assessment
            }, void 0, false, {
                fileName: "[project]/app/dashboard/diagnostics/[id]/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/diagnostics/[id]/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/dashboard/diagnostics/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/dashboard/diagnostics/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__72ca3e95._.js.map