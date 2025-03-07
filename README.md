# CV Generator Plus

![CV Generator Plus](https://via.placeholder.com/1200x630/e4f2ff/2563eb?text=CV+Generator+Plus)

## 📋 Sobre o Projeto

CV Generator Plus é uma aplicação web moderna para criar currículos profissionais de forma rápida e fácil. Com uma interface intuitiva e responsiva, você pode criar, visualizar e baixar seu currículo em PDF em questão de minutos.

### ✨ Funcionalidades Principais

- 📝 Editor intuitivo para inserir todas as informações do currículo
- 🎨 Personalize cores do currículo (cor primária, texto e fundo)
- 🔗 Adicione links para suas redes sociais (com opção de mostrar como ícones ou links completos)
- 👁️ Visualização em tempo real de como seu currículo ficará
- 📱 Design totalmente responsivo (funciona em desktop, tablet e celular)
- 📄 Geração de PDF profissional com um clique
- 💾 Salve e carregue dados do currículo automaticamente
- 🌓 Suporte a tema claro e escuro

## 🛠️ Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias modernas:

- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática
- **Vite**: Build tool e dev server extremamente rápido
- **Tailwind CSS**: Framework CSS utilitário para design rápido e responsivo
- **Shadcn UI**: Componentes de UI reutilizáveis construídos com Radix UI e Tailwind
- **React PDF**: Biblioteca para criação dinâmica de documentos PDF
- **Lucide Icons**: Conjunto de ícones bonitos e consistentes
- **React Router**: Para navegação entre páginas
- **React Hook Form**: Para gerenciamento de formulários
- **Zod**: Para validação de dados

## 🚀 Como Iniciar o Projeto

### Pré-requisitos

- Node.js (versão 16.x ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/cv-generator-plus.git
cd cv-generator-plus
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn
```

3. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
```

4. **Acesse o aplicativo**

Abra o navegador e acesse `http://localhost:8080`

## 📦 Construção para Produção

Para gerar a versão de produção do aplicativo:

```bash
npm run build
# ou
yarn build
```

Os arquivos serão gerados na pasta `dist/`, prontos para serem implantados em qualquer servidor web estático.

## 🧩 Estrutura do Projeto

```
cv-generator-plus/
├── public/            # Arquivos públicos (favicon, imagens)
├── src/               # Código fonte
│   ├── components/    # Componentes React
│   │   ├── cv/        # Componentes específicos do currículo
│   │   └── ui/        # Componentes de UI (shadcn)
│   ├── hooks/         # React hooks customizados
│   ├── lib/           # Funções utilitárias
│   ├── pages/         # Componentes de página
│   ├── types/         # Tipos TypeScript
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Ponto de entrada
├── package.json       # Dependências e scripts
└── tailwind.config.ts # Configuração do Tailwind CSS
```

## 🌈 Personalizando o Currículo

### Cores do Tema

O CV Generator Plus permite personalizar as cores do seu currículo:

1. Navegue até a aba "Visualizar"
2. No painel lateral à direita, clique em "Personalizar Cores"
3. Escolha entre os temas predefinidos ou selecione cores personalizadas
4. As alterações são aplicadas em tempo real na visualização

### Formatação de Redes Sociais

1. Navegue até a aba "Redes" no formulário
2. Adicione links para suas plataformas preferidas
3. Utilize o botão "Mostrar como ícones" para alternar entre exibição compacta (ícones) ou completa (links)

## 📱 Responsividade

O aplicativo é totalmente responsivo e foi otimizado para:

- Desktops (1024px e acima)
- Tablets (768px - 1023px)
- Smartphones (abaixo de 768px)

A interface se adapta automaticamente ao tamanho da tela, proporcionando uma experiência de usuário consistente em todos os dispositivos.

## 🔄 Iterações Futuras

Algumas melhorias planejadas para o futuro:

- Mais templates de currículo
- Opção para adicionar foto
- Exportação para outros formatos (DOCX, HTML)
- Versão multilíngue

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar o projeto.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
