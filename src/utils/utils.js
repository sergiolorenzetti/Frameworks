exports.validarCPF = (cpf) => {
    if (!cpf) {
        throw new Error("CPF não informado");
    }

    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) {
        throw new Error("CPF deve conter 11 dígitos numéricos");
    }

    // Elimina CPFs inválidos conhecidos (sequências repetidas)
    if (/^(\d)\1{10}$/.test(cpf)) {
        throw new Error("CPF inválido (sequência repetida)");
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) {
        throw new Error("CPF inválido (primeiro dígito verificador incorreto)");
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) {
        throw new Error("CPF inválido (segundo dígito verificador incorreto)");
    }

    return true; // CPF válido
};
exports.validarRG = (rg) => {
  if (!rg) return false;

  // Remove pontos e hífens
  const rgLimpo = rg.replace(/[.\-]/g, "");

  // Verifica se contém apenas números
  if (!/^\d+$/.test(rgLimpo)) {
    return false;
  }

  // RG normalmente tem entre 7 e 9 dígitos (dependendo do estado)
  if (rgLimpo.length < 7 || rgLimpo.length > 9) {
    return false;
  }

  return true;
}
exports.validarDataNascimento = (dataNascimento, dataMinima = 16) => {
    if (!dataNascimento) return false;

    const nascimento = new Date(dataNascimento);
    if (isNaN(nascimento)) return false;

    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade >= dataMinima;
}
