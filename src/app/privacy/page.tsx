"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function Privacy() {
  return (
    <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col gap-2 p-2 pb-8 text-sm text-black">
      <div className="bg-bg-1 relative flex w-full items-center justify-center">
        <ChevronLeft
          onClick={() => window.history.back()}
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-white"
        />
        <Image
          src="/logos/logo.png"
          alt=""
          width={1000}
          height={500}
          className="h-max w-80 object-contain"
        />
      </div>
      <span className="mx-auto w-max text-lg font-bold">
        POLÍTICA DE PRIVACIDADE - HEALTH VOICE
      </span>
      <span>
        Esta Política de Privacidade descreve como a Executivo{"'"}s Digital (
        {"'"}
        Nós{"'"},{"'"}Nosso{"'"}, {"'"}Nossa{"'"}), desenvolvedora do aplicativo{" "}
        {"'"}Health Voice{"'"}({"'"}Aplicativo{"'"}), coleta, utiliza, armazena,
        protege e, em raras ocasiões, compartilha suas informações pessoais, bem
        como a forma como você, Usuário ({"'"}Você{"'"}, {"'"}Seu{"'"}, {"'"}Sua
        {"'"}), pode exercer seus direitos como titular de dados sob a Lei Geral
        de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD) e outras
        legislações aplicáveis.
      </span>
      <span>
        A presente Política deve ser lida em conjunto com os Termos de Uso do
        Health Voice. Ao utilizar o Aplicativo, você concorda com as práticas
        descritas nesta Política de Privacidade.
      </span>
      <span className="font-semibold">
        1. NOSSO COMPROMISSO COM SUA PRIVACIDADE E A LGPD
      </span>
      <span>
        A Executivo{"'"}s Digital está profundamente comprometida com a proteção
        da sua privacidade e de seus dados pessoais. Desenvolvemos o Health
        Voice com a privacidade em mente (Privacy by Design), implementando
        medidas técnicas e organizacionais rigorosas para garantir a segurança e
        a conformidade com a LGPD e o Código de Ética Médica.
      </span>
      <span className="font-semibold">
        2. QUAIS DADOS COLETAMOS E PARA QUAIS FINALIDADES?
      </span>
      <span>
        A coleta de dados pelo Health Voice se divide em duas categorias
        principais: Dados de Cadastro e Uso da Plataforma (tratados por nós como
        Controlador) e Conteúdo Gerado pelo Usuário (no qual atuamos como
        Operador para o Usuário, que é o Controlador).
      </span>
      <span className="font-semibold">
        2.1. Dados de Cadastro e Uso da Plataforma (Dados Pessoais Comuns)
      </span>
      <span>
        Estes são os dados que você nos fornece diretamente para criar e
        gerenciar sua conta, bem como informações sobre como você interage com o
        Aplicativo.
      </span>
      <span className="font-semibold">Identificação e Contato:</span>
      <span>Dados: Nome completo, e-mail, telefone (opcional).</span>
      <span>
        Finalidade: Para criar e gerenciar sua conta de usuário, autenticar seu
        acesso, enviar comunicações importantes relacionadas ao serviço, suporte
        técnico, cobrança de planos e cumprimento de obrigações legais e
        regulatórias.
      </span>
      <span>
        Base Legal LGPD: Execução de contrato ou de procedimentos preliminares
        relacionados a contrato (Art. 7º, V) e Cumprimento de obrigação legal ou
        regulatória (Art. 7º, II).
      </span>
      <span className="font-semibold">Dados de Pagamento:</span>
      <span>
        Dados: Informações necessárias para processamento de pagamentos (ex:
        dados de cartão de crédito, informações de conta bancária, a depender do
        método escolhido). Importante: Estes dados são geralmente processados
        por gateways de pagamento terceirizados e não são armazenados
        integralmente por nós.
      </span>
      <span>
        Finalidade: Para processar a assinatura dos planos de serviço e
        gerenciar as transações financeiras.
      </span>
      <span>Base Legal LGPD: Execução de contrato (Art. 7º, V).</span>
      <span className="font-semibold">Dados de Uso e Interação:</span>
      <span>
        Dados: Informações sobre como você utiliza o aplicativo (ex: recursos
        acessados, tempo de uso, informações de dispositivos, sistema
        operacional, versão do app).
      </span>
      <span>
        Finalidade: Para melhorar a funcionalidade do Aplicativo, identificar e
        corrigir erros, entender padrões de uso para aprimorar a experiência do
        Usuário, e garantir a segurança e o desempenho do serviço.
      </span>
      <span>
        Base Legal LGPD: Legítimo interesse (Art. 7º, IX) e Execução de contrato
        (Art. 7º, V).
      </span>
      <span className="font-semibold">
        2.2. Conteúdo Gerado pelo Usuário (Dados Pessoais Sensíveis – Saúde)
      </span>
      <span>
        Esta categoria refere-se aos áudios de consultas, transcrições e
        anotações gravadas e geradas por você dentro do Aplicativo.
      </span>
      <span className="font-semibold">Dados:</span>
      <span className="pl-4">
        Áudios de Consultas: Gravações de voz de interações profissionais
        (médico-paciente, reuniões etc.).
      </span>
      <span className="pl-4">
        Transcrições de Áudio: Texto gerado a partir do processamento dos
        áudios.
      </span>
      <span className="pl-4">
        Anotações e Lembretes: Textos inseridos pelo Usuário para fins de
        organização, estudo ou lembretes.
      </span>
      <span className="pl-4">
        Identificação de Interlocutores: Nomes ou perfis associados às vozes
        identificadas pela IA (limitado a 2 pessoas para a IA proprietária,
        conforme o plano contratado).
      </span>
      <span className="font-semibold">Finalidade:</span>
      <span>
        A única finalidade para a qual o Health Voice processa este tipo de dado
        é para prover a funcionalidade de gravação, transcrição e organização
        conforme as instruções e comandos do Usuário.
      </span>
      <span className="font-semibold">Base Legal LGPD:</span>
      <span className="font-semibold">Para o Usuário (Controlador):</span>
      <span>
        O Usuário, na qualidade de profissional de saúde ou responsável pela
        interação, é o Controlador dos dados contidos nos áudios, transcrições e
        anotações. Ele é EXCLUSIVAMENTE responsável por obter o CONSENTIMENTO
        explícito e informado dos titulares dos dados (pacientes e/ou demais
        interlocutores) para a gravação, armazenamento e tratamento desses dados
        de saúde, conforme o Art. 11, I da LGPD. Além disso, outras bases legais
        para tratamento de dados sensíveis, como o Art. 11, II, alínea {"'"}f
        {"'"}
        (proteção da vida ou incolumidade física do titular ou de terceiro), ou
        {"'"}g{"'"} (garantia da prevenção à fraude e à segurança do titular),
        sob as condições ali estabelecidas, podem ser aplicáveis à sua prática
        profissional.
      </span>
      <span className="font-semibold">
        Para a Executivo{"'"}s Digital (Operador):
      </span>
      <span>
        Atuamos estritamente como Operador destes dados. Nosso tratamento se
        baseia na EXECUÇÃO DO CONTRATO DE PRESTAÇÃO DE SERVIÇOS com o Usuário.
        Agimos sob as instruções do Usuário, que delegou a operacionalização do
        tratamento de dados de saúde à nossa plataforma. A Executivo{"'"}s
        Digital não toma decisões sobre o tratamento desses dados sensíveis nem
        os utiliza para finalidades distintas das estabelecidas por seus
        Usuários.
      </span>
      <span className="font-semibold">Importante:</span>
      <span>
        A Executivo{"'"}s Digital NÃO ARMAZENA DE FORMA PERMANENTE os áudios e
        suas transcrições em seus servidores. O processamento para gerar a
        transcrição ocorre de forma segura, efêmera e criptografada, diretamente
        vinculada à sessão do usuário e às funcionalidades solicitadas, sem
        retenção permanente pela Executivo{"'"}s Digital.
      </span>
      <span className="font-semibold">2.3. Dados de Localização:</span>
      <span>
        Dados: Nosso aplicativo NÃO SOLICITA nem coleta dados de localização do
        seu dispositivo.
      </span>
      <span className="font-semibold">
        3. COMO SEUS DADOS SÃO ARMAZENADOS E PROTEGIDOS?
      </span>
      <span className="font-semibold">
        3.1. Dados de Cadastro e Uso da Plataforma:
      </span>
      <span>
        São armazenados em servidores seguros, com medidas de segurança
        compatíveis com o estado da arte e com as melhores práticas de mercado,
        incluindo criptografia de dados em trânsito e em repouso, firewalls,
        controle de acesso restrito e monitoramento contínuo.
      </span>
      <span className="font-semibold">
        3.2. Conteúdo Gerado pelo Usuário (Áudios, Transcrições, Anotações):
      </span>
      <span className="font-semibold">
        Armazenamento Local (Dispositivo do Usuário):
      </span>
      <span>
        Preferencialmente, o conteúdo é armazenado no dispositivo do Usuário. O
        Usuário é responsável por garantir a segurança física e lógica de seu
        próprio dispositivo.
      </span>
      <span className="font-semibold">
        Sincronização em Nuvem (Serviços de Terceiros):
      </span>
      <span>
        Se o Usuário optar por funcionalidades de sincronização ou backup em
        nuvem (ex: Google Drive, iCloud, OneDrive), o armazenamento ocorrerá nos
        serviços desses terceiros, sob a responsabilidade do Usuário quanto à
        configuração e segurança de sua conta junto a esses serviços. A
        Executivo{"'"}s Digital não acessa ou gerencia diretamente essas contas
        de terceiros.
      </span>
      <span className="font-semibold">Processamento Efêmero:</span>
      <span>
        Durante o processo de transcrição, os áudios podem ser temporariamente
        processados em servidores seguros, com criptografia ponta a ponta e sem
        retenção após a conclusão do serviço de transcrição, garantindo que não
        ocorra armazenamento permanente desses dados pela Executivo{"'"}s
        Digital.
      </span>
      <span className="font-semibold">3.3. Segurança Geral:</span>
      <span>
        Adotamos padrões rigorosos de segurança e criptografia para proteger
        seus dados contra acesso não autorizado, alteração, divulgação ou
        destruição. Nosso ambiente de desenvolvimento e produção segue as
        melhores práticas de segurança da informação.
      </span>
      <span className="font-semibold">
        4. COMPARTILHAMENTO DE DADOS COM TERCEIROS
      </span>
      <span className="font-semibold">4.1. Provedores de Serviços:</span>
      <span>
        Podemos compartilhar seus Dados de Cadastro e Uso da Plataforma com
        parceiros e prestadores de serviços que nos auxiliam na operação do
        Aplicativo, tais como processadores de pagamento, provedores de análise
        de dados, serviços de nuvem e ferramentas de comunicação. Esses
        terceiros estão contratualmente obrigados a proteger seus dados e
        utilizá-los apenas para os fins específicos para os quais foram
        contratados.
      </span>
      <span className="font-semibold">4.2. Conteúdo Gerado pelo Usuário:</span>
      <span>
        O Conteúdo Gerado pelo Usuário (áudios, transcrições, anotações) NÃO É
        COMPARTILHADO com terceiros pela Executivo{"'"}s Digital para qualquer
        finalidade que não seja a prestação do serviço diretamente solicitado
        pelo Usuário (ex: processamento de transcrição), e mesmo assim, de forma
        temporária e sem retenção.
      </span>
      <span className="font-semibold">4.3. Requisitos Legais:</span>
      <span>
        Podemos divulgar suas informações pessoais se exigido por lei, ordem
        judicial, processo legal ou solicitação de autoridades governamentais.
      </span>
      <span className="font-semibold">
        5. TRANSFERÊNCIA INTERNACIONAL DE DADOS
      </span>
      <span>
        Caso haja necessidade de transferência de dados para fora do Brasil,
        como no caso de utilização de serviços de nuvem de provedores globais,
        nos certificaremos de que tal transferência observe as condições
        estabelecidas na LGPD, garantindo que o país ou a organização
        internacional em questão proporcionem um grau de proteção de dados
        pessoais adequado ou mediante a adoção de cláusulas contratuais
        específicas, normas corporativas globais ou selos, certificados e
        códigos de conduta.
      </span>
      <span className="font-semibold">
        6. SEUS DIREITOS COMO TITULAR DE DADOS (LGPD)
      </span>
      <span>
        A LGPD garante a você vários direitos referentes aos seus dados
        pessoais. Você pode exercer esses direitos a qualquer momento, mediante
        requisição:
      </span>
      <span className="pl-4">
        Confirmação: Confirmar a existência de tratamento de seus dados.
      </span>
      <span className="pl-4">
        Acesso: Acessar seus dados pessoais tratados por nós.
      </span>
      <span className="pl-4">
        Retificação: Corrigir dados incompletos, inexatos ou desatualizados.
      </span>
      <span className="pl-4">
        Anonimização, Bloqueio ou Eliminação: Solicitar a anonimização, bloqueio
        ou eliminação de dados desnecessários, excessivos ou tratados em
        desconformidade com a LGPD.
      </span>
      <span className="pl-4">
        Portabilidade: Solicitar a portabilidade dos seus dados para outro
        fornecedor de serviço ou produto.
      </span>
      <span className="pl-4">
        Eliminação: Solicitar a eliminação dos dados pessoais tratados com o seu
        consentimento (exceto nos casos previstos na LGPD).
      </span>
      <span className="pl-4">
        Informação: Obter informações sobre as entidades públicas e privadas com
        as quais compartilhamos seus dados.
      </span>
      <span className="pl-4">
        Informação sobre o não consentimento: Ser informado sobre a
        possibilidade de não fornecer consentimento e sobre as consequências da
        negativa.
      </span>
      <span className="pl-4">
        Revogação do consentimento: Revogar seu consentimento a qualquer
        momento, sem que isso afete a legalidade do tratamento realizado antes
        da revogação.
      </span>
      <span className="pl-4">
        Oposição: Opor-se a um tratamento de dados que viole a LGPD.
      </span>
      <span>
        Para exercer qualquer um desses direitos, entre em contato conosco
        através do canal indicado no item 9 desta Política. Responderemos à sua
        solicitação em um prazo razoável e de acordo com a legislação aplicável.
        Poderemos solicitar informações adicionais para confirmar sua
        identidade.
      </span>
      <span className="font-semibold">7. RETENÇÃO DE DADOS</span>
      <span>
        Retemos seus Dados de Cadastro e Uso da Plataforma pelo tempo necessário
        para cumprir as finalidades para as quais foram coletados, para
        prestação dos serviços contratados, para cumprir obrigações legais,
        resolver disputas e fazer cumprir nossos acordos.
      </span>
      <span>
        Como mencionado, o Conteúdo Gerado pelo Usuário (áudios e transcrições)
        NÃO É RETIDO de forma permanente pela Executivo{"'"}s Digital em seus
        servidores.
      </span>
      <span className="font-semibold">
        8. ALTERAÇÕES A ESTA POLÍTICA DE PRIVACIDADE
      </span>
      <span>
        A Executivo{"'"}s Digital reserva-se o direito de modificar esta
        Política de Privacidade a qualquer momento, para adaptá-la a novas
        funcionalidades do Aplicativo, mudanças na legislação ou melhores
        práticas de mercado. As alterações serão publicadas no Aplicativo e/ou
        em nosso site, com indicação da data da última atualização. O uso
        contínuo do Aplicativo após a publicação das alterações constitui sua
        aceitação dos termos revisados.
      </span>
      <span className="font-semibold">
        9. CONTATO DO ENCARREGADO DE DADOS (DPO)
      </span>
      <span>
        Se você tiver dúvidas, comentários ou preocupações sobre esta Política
        de Privacidade ou sobre o tratamento dos seus dados pessoais, ou se
        desejar exercer seus direitos como titular de dados, por favor, entre em
        contato com nosso Encarregado de Dados (DPO):
      </span>
      <span className="pl-4">
        Encarregado de Dados (DPO): Gabriel Antônio de Moura Fernandes
      </span>
      <span className="pl-4">E-mail: diretoria@executivosdigital.com.br</span>
      <span className="font-semibold">
        Data da Última Atualização: 19/10/2025
      </span>
    </div>
  );
}
