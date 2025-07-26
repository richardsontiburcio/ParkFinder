import React, { useState } from 'react';
import { Card } from './ui/card';
import { User, Building2, Mail, Phone, MapPin, Lock, Eye, EyeOff } from 'lucide-react';

const UserRegister = () => {
  const [userType, setUserType] = useState('pessoa_fisica'); // 'pessoa_fisica' ou 'pessoa_juridica'
  const [formData, setFormData] = useState({
    nome: '',
    documento: '',
    email: '',
    telefone: '',
    endereco: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Função para formatar CPF
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  // Função para formatar CNPJ
  const formatCNPJ = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  // Função para formatar telefone
  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'documento') {
      formattedValue = userType === 'pessoa_fisica' ? formatCPF(value) : formatCNPJ(value);
    } else if (name === 'telefone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.documento.trim()) {
      newErrors.documento = userType === 'pessoa_fisica' ? 'CPF é obrigatório' : 'CNPJ é obrigatório';
    } else {
      const cleanDoc = formData.documento.replace(/\D/g, '');
      if (userType === 'pessoa_fisica' && cleanDoc.length !== 11) {
        newErrors.documento = 'CPF deve ter 11 dígitos';
      } else if (userType === 'pessoa_juridica' && cleanDoc.length !== 14) {
        newErrors.documento = 'CNPJ deve ter 14 dígitos';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (userType === 'pessoa_juridica' && !formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório para estacionamentos';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simular cadastro
      if (userType === 'pessoa_juridica') {
        alert(`Estacionamento "${formData.nome}" cadastrado com sucesso! Será adicionado ao mapa de busca.`);
      } else {
        alert(`Usuário "${formData.nome}" cadastrado com sucesso!`);
      }
      
      // Resetar formulário
      setFormData({
        nome: '',
        documento: '',
        email: '',
        telefone: '',
        endereco: '',
        senha: '',
        confirmarSenha: ''
      });
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData(prev => ({
      ...prev,
      documento: '',
      endereco: type === 'pessoa_fisica' ? '' : prev.endereco
    }));
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cadastre-se no ParkFinder
          </h1>
          <p className="text-gray-600">
            Encontre vagas ou cadastre seu estacionamento
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          {/* Seletor de Tipo de Usuário */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Cadastro
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleUserTypeChange('pessoa_fisica')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'pessoa_fisica'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Pessoa Física</div>
                <div className="text-xs">Usuário comum</div>
              </button>
              
              <button
                type="button"
                onClick={() => handleUserTypeChange('pessoa_juridica')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'pessoa_juridica'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <Building2 className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Pessoa Jurídica</div>
                <div className="text-xs">Estacionamento</div>
              </button>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {userType === 'pessoa_fisica' ? 'Nome Completo' : 'Nome do Estacionamento'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={userType === 'pessoa_fisica' ? 'Digite seu nome completo' : 'Digite o nome do estacionamento'}
                />
              </div>
              {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
            </div>

            {/* Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {userType === 'pessoa_fisica' ? 'CPF' : 'CNPJ'}
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.documento ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={userType === 'pessoa_fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
                  maxLength={userType === 'pessoa_fisica' ? 14 : 18}
                />
              </div>
              {errors.documento && <p className="mt-1 text-sm text-red-600">{errors.documento}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.telefone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>
              {errors.telefone && <p className="mt-1 text-sm text-red-600">{errors.telefone}</p>}
            </div>

            {/* Endereço - apenas para pessoa jurídica */}
            {userType === 'pessoa_juridica' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço do Estacionamento
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.endereco ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Rua, número, bairro, cidade"
                  />
                </div>
                {errors.endereco && <p className="mt-1 text-sm text-red-600">{errors.endereco}</p>}
              </div>
            )}

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.senha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.senha && <p className="mt-1 text-sm text-red-600">{errors.senha}</p>}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite a senha novamente"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmarSenha && <p className="mt-1 text-sm text-red-600">{errors.confirmarSenha}</p>}
            </div>

            {/* Informação para pessoa jurídica */}
            {userType === 'pessoa_juridica' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Building2 className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-orange-800">
                    <p className="font-medium mb-1">Estacionamento será adicionado ao mapa</p>
                    <p>Após o cadastro, seu estacionamento aparecerá nos resultados de busca do ParkFinder, permitindo que motoristas encontrem e reservem vagas.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Botão de Cadastro */}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              {userType === 'pessoa_fisica' ? 'Cadastrar Usuário' : 'Cadastrar Estacionamento'}
            </button>
          </form>

          {/* Link para Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <button className="text-orange-600 hover:text-orange-700 font-medium">
                Fazer Login
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserRegister;

