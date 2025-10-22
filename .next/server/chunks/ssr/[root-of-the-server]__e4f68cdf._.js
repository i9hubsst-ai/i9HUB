module.exports = [
"[project]/app/actions/assessments.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"003704039f18278a65b450ef19955e90040486cfd4":"getTemplates","4058f03ced2542bdc019a597f0be2d22bb4d9f5d78":"deleteAssessment","40a034a7cbde3511dc34fc324fd41df3996be85f22":"getAssessmentById","40b9270a14ce1aafec6a09d33de32de65b9197cd96":"getAssessments","40debba027ffc8dcfd812cb32a82e9d7cc887dd4de":"submitAssessment","60aa4c16a07b90d13fb34ec51e368c04a0c0ae3a8a":"createAssessment","7ca939386b446b8f89e68967d662dad7f0c7eaff3a":"saveAnswer"},"",""] */ __turbopack_context__.s([
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
        // Buscar informações do usuário criador via Supabase Auth
        let createdByUser = null;
        try {
            const { createClient } = await __turbopack_context__.A("[project]/lib/supabase/server.ts [app-rsc] (ecmascript, async loader)");
            const supabase = await createClient();
            // Usar o client admin do Supabase para buscar dados do usuário
            const { data, error } = await supabase.auth.admin.getUserById(assessment.createdBy);
            if (!error && data?.user) {
                createdByUser = {
                    id: data.user.id,
                    email: data.user.email || 'Desconhecido',
                    name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuário'
                };
            }
        } catch (error) {
            // Falha silenciosa - não impede o carregamento do diagnóstico
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/diagnostics/${assessmentId}`);
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAssessment, "60aa4c16a07b90d13fb34ec51e368c04a0c0ae3a8a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAssessments, "40b9270a14ce1aafec6a09d33de32de65b9197cd96", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAssessmentById, "40a034a7cbde3511dc34fc324fd41df3996be85f22", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTemplates, "003704039f18278a65b450ef19955e90040486cfd4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveAnswer, "7ca939386b446b8f89e68967d662dad7f0c7eaff3a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitAssessment, "40debba027ffc8dcfd812cb32a82e9d7cc887dd4de", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAssessment, "4058f03ced2542bdc019a597f0be2d22bb4d9f5d78", null);
}),
"[project]/app/actions/companies.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00c0d22aa313259f807cbe371ea6b2cf41da2c4a47":"getCompanies","4031bdd8a702cbac4d531069b56f8cc619165e845d":"deleteCompany","405ca82572cb72a402530f15bef39d092538b43b7e":"createCompany","40bd9b246332a2342941d72a60b83f061d6b789bc5":"getCompanyById","604075c18a2f3fe72495393cf1606772596114ceca":"updateCompany"},"",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCompany, "405ca82572cb72a402530f15bef39d092538b43b7e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCompany, "604075c18a2f3fe72495393cf1606772596114ceca", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCompany, "4031bdd8a702cbac4d531069b56f8cc619165e845d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompanies, "00c0d22aa313259f807cbe371ea6b2cf41da2c4a47", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompanyById, "40bd9b246332a2342941d72a60b83f061d6b789bc5", null);
}),
"[project]/app/actions/templates.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00982db7df77e27b1266abdd56d4425a538e3f8c61":"getPublishedTemplates","00b6a6c9e0df7a5f9da51a78416846bee7a20a805f":"getAllTemplates","40098f0176bbdf3205863d464bc6e13b0467a9801e":"publishTemplate","400f9e60241bfee2cddf9f1503fb3af0ffc6340f4c":"getTemplateById","4019f4870e5fa844698cb34eeded8ea368e6d3d0ec":"deleteTemplate","607df8cfd3277b8ac172493c4ba3962fddac959d86":"applyTemplateToAssessment","60e273704c34430a8d1a469bf5bd65981678b54b86":"updateTemplateStatus","60f85d61bfe68a5e6b8a206fab685949fbc97b3c70":"updateTemplate"},"",""] */ __turbopack_context__.s([
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
                                    requiresJustification: question.requiresJustification,
                                    requiresEvidence: question.requiresEvidence
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
                                    requiresJustification: question.requiresJustification,
                                    requiresEvidence: question.requiresEvidence
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
                                        requiresJustification: q.requiresJustification,
                                        requiresEvidence: q.requiresEvidence
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllTemplates, "00b6a6c9e0df7a5f9da51a78416846bee7a20a805f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTemplateById, "400f9e60241bfee2cddf9f1503fb3af0ffc6340f4c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTemplateStatus, "60e273704c34430a8d1a469bf5bd65981678b54b86", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTemplate, "4019f4870e5fa844698cb34eeded8ea368e6d3d0ec", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPublishedTemplates, "00982db7df77e27b1266abdd56d4425a538e3f8c61", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(publishTemplate, "40098f0176bbdf3205863d464bc6e13b0467a9801e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTemplate, "60f85d61bfe68a5e6b8a206fab685949fbc97b3c70", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(applyTemplateToAssessment, "607df8cfd3277b8ac172493c4ba3962fddac959d86", null);
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
    "00982db7df77e27b1266abdd56d4425a538e3f8c61",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$templates$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPublishedTemplates"],
    "00c0d22aa313259f807cbe371ea6b2cf41da2c4a47",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$companies$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompanies"],
    "00f8883ef96ef5c631f06187c209b354d3dd692cc1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "4010aebd6371c6feead759626c0391c073ea1e58ac",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signup"],
    "4016825733e652b94cf4561ec8a5d9684fcab13423",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePassword"],
    "402b7960d17e224f6e9c5f286eaef88ef6c00a99d8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetPassword"],
    "402e569670a1070d3577cfb7f73bbf22ea7167e65c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "60aa4c16a07b90d13fb34ec51e368c04a0c0ae3a8a",
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