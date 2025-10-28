"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      
      // Dar um pequeno delay para permitir que a sessão seja estabelecida após redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('🟡 RESET PAGE: Verificando sessão:', { 
        hasSession: !!session, 
        error: error?.message,
        userEmail: session?.user?.email,
        sessionId: session?.user?.id
      });
      
      if (session && session.user) {
        console.log('🟢 RESET PAGE: Sessão válida encontrada');
        setIsValidSession(true);
      } else {
        console.log('🔴 RESET PAGE: Nenhuma sessão válida');
        setIsValidSession(false);
        
        // Aguardar mais um pouco antes de redirecionar
        setTimeout(() => {
          console.log('🔴 RESET PAGE: Redirecionando para login após timeout');
          router.push('/auth/login?error=sessao-expirada-reset');
        }, 2000);
      }
    };
    
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("password", password);

      const result = await updatePassword(formData);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Erro ao atualizar senha. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Mostra loading enquanto verifica a sessão
  if (isValidSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Verificando sessão...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se não há sessão válida, não renderiza o formulário (redirecionamento já foi feito)
  if (!isValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Redirecionando...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Por favor, insira sua nova senha.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {success ? (
              <div className="bg-green-50 text-green-500 p-3 rounded-md text-sm">
                Senha alterada com sucesso! Você será redirecionado em instantes...
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full"
                    autoComplete="new-password"
                    disabled={loading || success}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme a nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full"
                    autoComplete="new-password"
                    disabled={loading || success}
                  />
                </div>
              </>
            )}
          </CardContent>

          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || success}
            >
              {loading ? "Atualizando..." : "Atualizar Senha"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}