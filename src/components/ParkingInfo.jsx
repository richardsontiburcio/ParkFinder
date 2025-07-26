import React from 'react';
import { Card } from './ui/card';
import { Building2, TrendingUp, Eye, Smartphone, Clock, Users, BarChart3, Zap, Globe } from 'lucide-react';

// Import das imagens
import smartParkingIot from '../assets/smart-parking-iot.webp';
import solarParking from '../assets/solar-parking.webp';
import smartParkingSystem from '../assets/smart-parking-system.png';
import smartParkingTech from '../assets/smart-parking-tech.png';
import revenueGrowthChart from '../assets/revenue-growth-chart.png';
import technologyBenefitsInfographic from '../assets/technology-benefits-infographic.png';
import marketOpportunityChart from '../assets/market-opportunity-chart.png';

const ParkingInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Junte-se à Era Digital dos Estacionamentos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transforme seu estacionamento com o ParkFinder e descubra como a tecnologia pode revolucionar seu negócio
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <img 
              src={smartParkingIot} 
              alt="Sistema de estacionamento inteligente com IoT" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <img 
              src={solarParking} 
              alt="Estacionamento solar moderno" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <img 
              src={smartParkingSystem} 
              alt="Sistema de estacionamento inteligente" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <img 
              src={smartParkingTech} 
              alt="Tecnologia de estacionamento inteligente" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Gráficos de Crescimento */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Potencial de Crescimento Comprovado
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <img 
                src={revenueGrowthChart} 
                alt="Gráfico de crescimento de receita" 
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Crescimento de Receita
              </h3>
              <p className="text-gray-600 text-sm">
                Aumento médio de 45% na receita dos estacionamentos parceiros
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <img 
                src={technologyBenefitsInfographic} 
                alt="Benefícios da tecnologia" 
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Benefícios Tecnológicos
              </h3>
              <p className="text-gray-600 text-sm">
                Transformação digital completa com monitoramento 24/7
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <img 
                src={marketOpportunityChart} 
                alt="Oportunidade de mercado" 
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Oportunidade de Mercado
              </h3>
              <p className="text-gray-600 text-sm">
                Mercado de R$ 2,5 bilhões com crescimento exponencial
              </p>
            </Card>
          </div>
        </div>

        {/* Por Que Aderir ao ParkFinder */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Por Que Aderir ao ParkFinder?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Visibilidade */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Máxima Visibilidade
              </h3>
              <p className="text-gray-600 mb-4">
                Seu estacionamento será encontrado por milhares de motoristas que buscam vagas na sua região
              </p>
              <div className="text-sm text-orange-600 font-medium">
                +300% mais clientes
              </div>
            </Card>

            {/* Rentabilidade */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Maior Rentabilidade
              </h3>
              <p className="text-gray-600 mb-4">
                Otimize a ocupação das suas vagas e aumente sua receita com preços dinâmicos e demanda constante
              </p>
              <div className="text-sm text-green-600 font-medium">
                +45% de receita
              </div>
            </Card>

            {/* Tecnologia */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Era Tecnológica
              </h3>
              <p className="text-gray-600 mb-4">
                Modernize seu negócio com gestão digital, pagamentos online e controle inteligente de vagas
              </p>
              <div className="text-sm text-blue-600 font-medium">
                100% digital
              </div>
            </Card>
          </div>
        </div>

        {/* Importância da Inclusão Digital */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="text-center">
            <Globe className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl font-bold mb-6">
              A Importância da Inclusão Digital
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-4xl mx-auto">
              Não fique para trás na revolução digital! O mercado de estacionamentos está se transformando rapidamente. 
              Estacionamentos que não se adaptarem à era digital perderão competitividade e clientes. 
              O ParkFinder oferece a ponte perfeita para essa transformação, garantindo que seu negócio permaneça relevante e lucrativo.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-blue-200">dos consumidores preferem soluções digitais</div>
              </div>
              <div>
                <Zap className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">3x</div>
                <div className="text-sm text-blue-200">mais rápido para encontrar vagas</div>
              </div>
              <div>
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">60%</div>
                <div className="text-sm text-blue-200">redução no tempo de busca</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Features Section */}
        <Card className="p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            O que você ganha ao aderir ao ParkFinder
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Users className="w-5 h-5 text-orange-600 mt-1" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Base de Clientes Ativa</h4>
                <p className="text-sm text-gray-600">
                  Acesso a milhares de motoristas que procuram estacionamento diariamente
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Clock className="w-5 h-5 text-orange-600 mt-1" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Gestão em Tempo Real</h4>
                <p className="text-sm text-gray-600">
                  Controle ocupação, preços e disponibilidade através do nosso painel
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-orange-600 mt-1" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Análises e Relatórios</h4>
                <p className="text-sm text-gray-600">
                  Dados detalhados sobre ocupação, receita e comportamento dos clientes
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Smartphone className="w-5 h-5 text-orange-600 mt-1" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Pagamentos Digitais</h4>
                <p className="text-sm text-gray-600">
                  Receba pagamentos automaticamente via PIX, cartão e carteiras digitais
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-6 sm:p-8 text-center bg-gradient-to-r from-orange-600 to-orange-700 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Pronto para Modernizar seu Estacionamento?
          </h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Não fique para trás! Junte-se aos estacionamentos que já descobriram o poder da tecnologia para aumentar sua rentabilidade e visibilidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
              Quero Aderir Agora
            </button>
            <button className="border border-orange-200 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Saber Mais
            </button>
          </div>
          
          <div className="mt-6 text-sm text-orange-200">
            <p>📞 Entre em contato: (81) 9999-9999</p>
            <p>📧 Email: parceiros@parkfinder.com.br</p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">500+</div>
            <div className="text-sm text-gray-600">Estacionamentos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">50k+</div>
            <div className="text-sm text-gray-600">Usuários Ativos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">95%</div>
            <div className="text-sm text-gray-600">Satisfação</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingInfo;

