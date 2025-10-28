"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function Terms() {
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
        Termos de Uso - Health Voice
      </span>
      <span>
        Estes Termos de Uso ({"'"}Termos{"'"}) regem o acesso e a utilização do
        aplicativo {"'"}Health Voice{"'"} ({"'"}Aplicativo{"'"}), desenvolvido
        pela Executivo{"'"}s Digital, disponível para dispositivos móveis. Ao
        acessar, instalar, utilizar ou se cadastrar no Aplicativo, o usuário (
        {"'"}Usuário{"'"}) DECLARA TER LIDO, ENTENDIDO E CONCORDADO COM ESTES
        TERMOS DE USO. Caso não concorde com qualquer disposição destes Termos,
        o Usuário não deverá utilizar o Aplicativo.
      </span>
      <span className="font-semibold">1. SOBRE O HEALTH VOICE</span>
      <span>
        1.1. O Health Voice é um aplicativo desenvolvido para auxiliar médicos e
        outros profissionais da área de saúde na gravação, transcrição e gestão
        de informações provenientes de consultas, reuniões e interações
        profissionais. Sua principal funcionalidade é a gravação de áudios com
        identificação dos interlocutores (limitado a 2 pessoas para a IA
        proprietária, conforme o plano contratado), transcrição automática do
        conteúdo falado e organização dessas informações.
      </span>
      <span>
        1.2. Além das funcionalidades de gravação e transcrição, o Aplicativo
        permite ao Usuário:
      </span>
      <span className="pl-4">
        a{")"} Registrar lembretes e anotações diversas (incluindo anotações de
        estudo);
      </span>
      <span className="pl-4">
        b{")"} Receber notificações de lembretes em horários previamente
        definidos.
      </span>
      <span>
        1.3. O Health Voice é uma ferramenta de apoio administrativo, visando
        otimizar a organização e a gestão da informação, não substituindo, em
        hipótese alguma, o prontuário médico ou qualquer outro registro oficial,
        nem o discernimento profissional do Usuário.
      </span>
      <span className="font-semibold">2. CADASTRO E ACESSO AO APLICATIVO</span>
      <span>
        2.1. Para utilizar o Aplicativo e suas funcionalidades, o Usuário deverá
        realizar um cadastro, fornecendo informações verdadeiras, precisas,
        completas e atualizadas, conforme solicitado.
      </span>
      <span>
        2.2. O Usuário é o único responsável pela guarda e sigilo de seu login e
        senha, e deverá notificar imediatamente a Executivo{"'"}s Digital em
        caso de qualquer uso não autorizado de sua conta ou quebra de segurança.
      </span>
      <span>
        2.3. A Executivo{"'"}s Digital não se responsabiliza por perdas e danos
        decorrentes do não cumprimento do disposto nesta seção.
      </span>
      <span className="font-semibold">3. PLANOS DE SERVIÇO E COBRANÇA</span>
      <span>
        3.1. O Health Voice oferece diferentes planos de serviço, que podem
        incluir funcionalidades e limites de uso distintos. Os planos atualmente
        disponíveis são:
      </span>
      <span>
        3.2. As condições específicas de cada plano, incluindo preços, período
        de cobrança, métodos de pagamento e políticas de renovação, serão
        detalhadas no momento da contratação ou por meio de comunicações
        específicas realizadas pela Executivo{"'"}s Digital.
      </span>
      <span>
        3.3. O cancelamento de qualquer plano deverá seguir o procedimento
        informado no próprio Aplicativo ou em nosso canal de suporte. O
        cancelamento poderá acarretar na perda de acesso às funcionalidades
        pagas e/ou redução dos limites de uso, ao final do período de cobrança
        pago.
      </span>
      <span>
        3.4. A Executivo{"'"}s Digital reserva-se o direito de alterar os preços
        dos planos ou introduzir novas cobranças, mediante comunicação prévia
        aos Usuários, com antecedência mínima de 30 (trinta) dias. O uso
        contínuo do serviço após essa comunicação implicará na aceitação dos
        novos valores.
      </span>
      <span className="font-semibold">
        4. USO ADEQUADO DO APLICATIVO E RESPONSABILIDADES DO USUÁRIO
      </span>
      <span>
        4.1. O Usuário compromete-se a utilizar o Health Voice de forma ética e
        em conformidade com a legislação brasileira, especialmente a Lei Geral
        de Proteção de Dados Pessoais (LGPD), o Código de Ética Médica e
        quaisquer outras normas aplicáveis à sua profissão.
      </span>
      <span>
        4.2. Responsabilidade pela Obtenção de Consentimento: O Usuário é o
        ÚNICO E EXCLUSIVO RESPONSÁVEL pela obtenção do consentimento de todos os
        interlocutores para a gravação, armazenamento e transcrição de áudios
        por meio do Aplicativo. A Executivo{"'"}s Digital NÃO SE RESPONSABILIZA
        por qualquer uso indevido do Aplicativo ou pela falha do Usuário em
        coletar os consentimentos necessários, sendo o Usuário o único
        responsável por eventuais sanções legais ou éticas decorrentes de tal
        conduta.
      </span>
      <span>4.3. O Usuário se compromete a não:</span>
      <span className="pl-4">
        a{")"} Utilizar o Aplicativo para fins ilegais, fraudulentos ou não
        autorizados;
      </span>
      <span className="pl-4">
        b{")"} Compartilhar, distribuir, replicar ou comercializar o conteúdo
        gerado pelo Aplicativo sem a devida autorização e/ou consentimento das
        partes envolvidas;
      </span>
      <span className="pl-4">
        c{")"} Violar ou tentar violar a segurança do Aplicativo, incluindo, mas
        não se limitando a, acesso não autorizado a sistemas, dados ou contas;
      </span>
      <span className="pl-4">
        d{")"} Modificar, adaptar, traduzir, fazer engenharia reversa,
        descompilar, desmontar ou tentar extrair o código-fonte do Aplicativo;
      </span>
      <span className="pl-4">
        e{")"} Inserir vírus, cavalos de Troia, worms ou qualquer outro código
        malicioso que possa danificar, interferir, interceptar ou expropriar
        qualquer sistema, dado ou informação.
      </span>
      <span className="font-semibold">5. PROPRIEDADE INTELECTUAL</span>
      <span>
        5.1. Todos os direitos de propriedade intelectual relativos ao
        Aplicativo Health Voice, incluindo, mas não se limitando a, software,
        código-fonte, design, logotipos, marcas, imagens e textos, são de
        propriedade exclusiva da Executivo{"'"}s Digital.
      </span>
      <span>
        5.2. Estes Termos concedem ao Usuário uma licença limitada, não
        exclusiva, intransferível e revogável para acessar e utilizar o
        Aplicativo para fins profissionais e pessoais, nos termos aqui
        estabelecidos. Nenhuma outra licença ou direito é concedido
        implicitamente.
      </span>
      <span>
        5.3. O conteúdo gerado pelo Usuário (áudios, transcrições, anotações) é
        de sua propriedade, sendo de sua exclusiva responsabilidade o
        armazenamento, uso e gestão desses dados.
      </span>
      <span className="font-semibold">
        6. PROTEÇÃO DE DADOS PESSOAIS E PRIVACIDADE (LGPD)
      </span>
      <span>
        6.1. A Executivo{"'"}s Digital está comprometida com a proteção da
        privacidade e dos dados pessoais de seus Usuários, em conformidade com a
        Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD).
      </span>
      <span>
        6.2. NÃO HÁ ARMAZENAMENTO OU USO PARA TREINAMENTO: A Executivo{"'"}s
        Digital ESCLARECE E GARANTE que os dados de áudio e as transcrições
        geradas pelo Usuário DENTRO DO APLICATIVO HEALTH VOICE NÃO SÃO SALVOS em
        seus servidores para fins de treinamento da IA, comercialização ou
        qualquer outra finalidade que não seja o uso exclusivo do próprio
        Usuário, dentro do ambiente do aplicativo. O processamento dos dados
        para transcrição ocorre de forma segura e efêutica, sem retenção
        permanente pela Executivo{"'"}s Digital.
      </span>
      <span>
        6.3. As informações pessoais coletadas no cadastro do Usuário (nome,
        e-mail, etc.) são utilizadas exclusivamente para a gestão da conta,
        comunicação sobre o serviço, suporte técnico e cumprimento de obrigações
        legais, conforme detalhado em nossa Política de Privacidade.
      </span>
      <span>
        6.4. Os dados sensíveis (informações de saúde) contidos nos áudios e
        transcrições são processados exclusivamente no ambiente do Usuário e sob
        a sua gestão, sendo o Usuário o Controlador de Dados responsável por sua
        coleta, tratamento e guarda, nos termos da LGPD. A Executivo{"'"}s
        Digital atua como Operador, fornecendo a ferramenta de processamento,
        mas sem acesso ou armazenamento permanente desses dados.
      </span>
      <span>
        6.5. A Executivo{"'"}s Digital implementa medidas de segurança técnicas
        e administrativas para proteger os dados pessoais contra acesso,
        alteração, divulgação ou destruição não autorizados.
      </span>
      <span className="font-semibold">7. LIMITAÇÃO DE RESPONSABILIDADE</span>
      <span>
        7.1. O Health Voice é fornecido {"'"}no estado em que se encontra{"'"} e
        {"'"}conforme disponível{"'"}. A Executivo{"'"}s Digital não oferece
        garantias de qualquer tipo, expressas ou implícitas, sobre a adequação,
        confiabilidade, disponibilidade, atualidade, precisão ou ausência de
        erros do Aplicativo ou de seus conteúdos.
      </span>
      <span>
        7.2. A Executivo{"'"}s Digital não será responsável por quaisquer perdas
        ou danos diretos, indiretos, incidentais, especiais, punitivos ou
        consequenciais, incluindo, mas não se limitando a, lucros cessantes,
        perda de dados ou interrupção de negócios, decorrentes do uso ou da
        incapacidade de usar o Aplicativo, mesmo que tenha sido avisada da
        possibilidade de tais danos.
      </span>
      <span>
        7.3. Em nenhum caso a responsabilidade total da Executivo{"'"}s Digital,
        por todos os danos, perdas e causas de ação, excederá o valor total pago
        pelo Usuário pelo uso do Aplicativo nos últimos 12 (doze) meses
        anteriores à data do evento danoso.
      </span>
      <span>
        7.4. O Usuário assume total responsabilidade por quaisquer resultados
        obtidos a partir do uso do Aplicativo, incluindo decisões profissionais
        tomadas com base nas informações geradas, sendo sua a obrigação de
        verificação e validação de todo e qualquer dado.
      </span>
      <span className="font-semibold">8. RESCISÃO</span>
      <span>
        8.1. A Executivo{"'"}s Digital poderá, a seu exclusivo critério,
        suspender ou encerrar o acesso do Usuário ao Aplicativo, total ou
        parcialmente, a qualquer momento e por qualquer motivo, com ou sem aviso
        prévio, caso identifique violação destes Termos de Uso ou suspeita de
        atividades fraudulentas ou ilegais.
      </span>
      <span>
        8.2. O Usuário poderá rescindir sua conta a qualquer momento, seguindo
        as instruções fornecidas no Aplicativo.
      </span>
      <span>
        8.3. Em caso de rescisão, as disposições destes Termos que, por sua
        natureza, deverão sobreviver, permanecerão em pleno vigor e efeito.
      </span>
      <span className="font-semibold">9. DISPOSIÇÕES GERAIS</span>
      <span>
        9.1. Modificações: A Executivo{"'"}s Digital reserva-se o direito de
        modificar estes Termos a qualquer momento. As modificações entrarão em
        vigor imediatamente após sua publicação no Aplicativo ou no site
        oficial. O uso contínuo do Aplicativo após a publicação das alterações
        constituirá aceitação dos Termos revisados.
      </span>
      <span>
        9.2. Cessão: O Usuário não poderá ceder ou transferir estes Termos, no
        todo ou em parte, sem o consentimento prévio por escrito da Executivo
        {"'"}s Digital.
      </span>
      <span>
        9.3. Comunicação: Todas as comunicações relacionadas a estes Termos ou
        ao Aplicativo deverão ser realizadas através dos canais de suporte
        indicados no Aplicativo ou no site da Executivo{"'"}s Digital.
      </span>
      <span>
        9.4. Legislação Aplicável e Foro: Estes Termos serão regidos e
        interpretados de acordo com a legislação brasileira. As partes elegem o
        foro da Comarca Sinop - MT para dirimir quaisquer controvérsias
        decorrentes destes Termos, renunciando a qualquer outro, por mais
        privilegiado que seja.
      </span>
      <span className="font-semibold">10. CONTATO</span>
      <span>
        Em caso de dúvidas sobre estes Termos de Uso, entre em contato com a
        Executivo{"'"}s Digital através do e-mail health.voiceofc@gmail.com ou
        pelo canal de suporte disponível no Aplicativo.
      </span>
    </div>
  );
}
