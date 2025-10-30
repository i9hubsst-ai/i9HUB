import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { validateCNPJ } from '../../../lib/utils/validateCNPJ';

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  // Validate CNPJ format
  if (!validateCNPJ(body.cnpj)) {
    return NextResponse.json(
      { error: 'CNPJ inválido' },
      { status: 400 }
    );
  }

  // Check if CNPJ already exists
  const { data: existingCompany } = await supabase
    .from('companies')
    .select('id')
    .eq('cnpj', body.cnpj)
    .single();

  if (existingCompany) {
    return NextResponse.json(
      { error: 'CNPJ já cadastrado' },
      { status: 400 }
    );
  }

  // Proceed with company registration
  const { data, error } = await supabase
    .from('companies')
    .insert([body])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
