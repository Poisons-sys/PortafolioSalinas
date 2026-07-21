from __future__ import annotations

from pathlib import Path
from shutil import copy2
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Frame, HRFlowable, Paragraph, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public"
PHOTO = ROOT / "scripts" / "assets" / "resume-photo.png"
PAGE_W, PAGE_H = A4
SIDEBAR_W = 238
MARGIN = 28
BLUE = HexColor("#4387df")
DARK = HexColor("#282828")
GRAY = HexColor("#686868")
LIGHT_GRAY = HexColor("#d7d7d7")


def register_fonts() -> tuple[str, str]:
    regular = Path("C:/Windows/Fonts/arial.ttf")
    bold = Path("C:/Windows/Fonts/arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("ResumeSans", regular))
        pdfmetrics.registerFont(TTFont("ResumeSans-Bold", bold))
        return "ResumeSans", "ResumeSans-Bold"
    return "Helvetica", "Helvetica-Bold"


FONT, FONT_BOLD = register_fonts()


COMMON_SKILLS = {
    "programming": ["JavaScript", "TypeScript", "C#", "Java", "PHP", "Python", "C", "C++", "Ruby", "Rust", "SQL"],
    "frontend": ["HTML5", "CSS3", "React", "Angular", "Vue.js", "Next.js", "Tailwind CSS", "Bootstrap", "Sass"],
    "backend": ["Node.js", "ASP.NET Core", "Laravel", "Express.js", "REST APIs", "WebSockets", "SignalR", "JWT"],
    "databases": ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis"],
    "tools": ["Git", "GitHub", "Docker", "Postman", "Vite", "npm", "Linux"],
    "cloud": ["Vercel", "Cloudflare", "Amazon Web Services (AWS)"],
}


DATA = {
    "en": {
        "filename": "ReneSalinasRamosCV-EN.pdf",
        "summary_title": "SUMMARY",
        "summary": "Software developer with experience in web and desktop applications. I have back-end skills in PHP and .NET and front-end experience with Vue.js and Bootstrap, as well as experience in unit testing and version control. I am looking for a position where I can continue developing my technical abilities and contribute effective solutions to the team.",
        "tech_title": "TECHNOLOGIES",
        "skill_labels": ["Programming languages", "Frontend development", "Backend development and APIs", "Databases", "Tools and practices", "Deployment and cloud services"],
        "skill_extras": ["Responsive design", "Web accessibility", "State management", "Database design and normalization"],
        "experience_title": "EXPERIENCE",
        "experience": [
            {
                "date": "March 2026 - present",
                "role": "SENIOR PROGRAMMER",
                "company": "Transportes Sal-Ave",
                "location": "Nuevo Laredo, Tamaulipas",
                "bullets": [
                    "Design and development of software applications and solutions tailored to clients in different industries.",
                    "Development and implementation of modules and new requirements for web applications.",
                    "Analysis of technical needs and creation of systems aimed at optimizing business processes.",
                    "Preparation and execution of technical analyses to assess the feasibility and scope of solutions.",
                    "Performance testing, diagnostics, and software optimization.",
                    "Process automation to improve application and system efficiency and performance.",
                    "Implementation of functional, technical, and performance improvements in existing solutions.",
                    "Development and integration of APIs to enable communication between applications and services.",
                    "Integration of multimedia resources such as graphics, audio, and video into web platforms.",
                    "Identification and resolution of issues throughout every stage of the development cycle.",
                    "Software maintenance and modification to correct errors and improve stability.",
                    "Code review and debugging to detect defects and ensure quality.",
                    "Collaboration with multidisciplinary teams to coordinate tasks, priorities, and delivery schedules.",
                ],
            },
            {
                "role": "COMPUTER SYSTEMS TECHNICIAN",
                "company": "Blue Duck Companies",
                "location": "Nuevo Laredo, Tamaulipas, Mexico",
                "bullets": [
                    "Maintained an orderly and clean workplace.", "Implemented processes and procedures.",
                    "Operated computer and technology systems.", "Performed administrative tasks.", "Provided customer service.",
                    "Processed payments and financial transactions.", "Completed assigned tasks effectively.",
                    "Worked as part of a team to meet company objectives.", "Maintained databases and records.",
                    "Handled phone calls and email.", "Provided general technical support for electronic devices.",
                    "Implemented optimization and continuous-improvement programs and solutions.",
                    "Maintained and monitored the performance of automated systems.",
                    "Recorded data for technical documentation.", "Introduced system improvements to increase reliability.",
                ],
            },
            {
                "role": "TRAFFIC AND OPERATIONS",
                "company": "Canales Grupo Aduanal",
                "location": "Nuevo Laredo",
                "bullets": [
                    "Managed international logistics efficiently while ensuring compliance with customs regulations.",
                    "Used transportation management systems and shipment-tracking tools.",
                    "Resolved complex problems in real time to keep logistics operations flowing smoothly.",
                    "Led multidisciplinary teams, encouraging collaboration and each member's professional development.",
                    "Managed documentation required for importing and exporting goods to ensure continuous operations.",
                ],
            },
            {
                "role": "COUNTER SALES ASSOCIATE",
                "company": "AT&T",
                "location": "Nuevo Laredo, Tamaulipas, Mexico",
                "bullets": [
                    "Customer service, product guidance, and resolution of questions.", "Maintained an organized sales counter.",
                    "Recorded daily sales to update stock databases.", "Processed payments, exchanges, and product returns.",
                    "Arranged items in displays and showcases to maximize attention.", "Used cash registers and point-of-sale terminals.",
                    "Counted cash and reconciled the register at the end of each shift.",
                    "Restocked and organized merchandise during periods of low customer traffic.",
                    "Processed payments and managed returns.",
                ],
            },
        ],
        "achievements_title": "ACHIEVEMENTS",
        "achievements": [
            "Participant in a United Nations conference through UN MODEL NSHMUN in 2015.",
            "Winner of several national public-speaking competitions.",
            "Second-place winner at the municipal level with the Load Logic project in the InnovaTecNM competition held in May 2026, in the energy sector and electromobility category, advancing to the national competition in Mexico City in September 2026.",
        ],
        "education_title": "EDUCATION",
        "education": [
            ("INCOMPLETE - COMPUTER SYSTEMS ENGINEERING", "Instituto Tecnológico de Nuevo Laredo, Nuevo Laredo", [
                "Computer Systems Engineering studies were left incomplete in the eighth semester due to significant personal circumstances, shortly before completion.",
                "Overall grade average at the time: 85, with general credits completed.",
            ]),
            ("DIGITAL AND INDUSTRIAL GRAPHIC DESIGN", "Instituto Anglo Español de Nuevo Laredo S.C., Nuevo Laredo", []),
            ("SECONDARY EDUCATION", "Instituto Anglo Español, Nuevo Laredo", []),
            ("PRIMARY EDUCATION", "Escuela Técnica Vespertina Guadalupe Mainero Juárez", []),
            ("ENGLISH CERTIFICATE - B2", "TOFL, Nuevo Laredo", []),
        ],
        "languages_title": "LANGUAGES",
        "languages": ["Spanish, English: primary languages", "French: upper-intermediate", "Italian: intermediate", "Portuguese: basic", "Russian: basic", "Japanese: beginner"],
    },
    "fr": {
        "filename": "ReneSalinasRamosCV-FR.pdf",
        "summary_title": "PROFIL",
        "summary": "Développeur logiciel expérimenté dans les applications web et de bureau. Je maîtrise le back-end avec PHP et .NET, ainsi que le front-end avec Vue.js et Bootstrap. J'ai également de l'expérience en tests unitaires et en gestion de versions. Je recherche un poste me permettant de continuer à développer mes compétences techniques et d'apporter des solutions efficaces à l'équipe.",
        "tech_title": "TECHNOLOGIES",
        "skill_labels": ["Langages de programmation", "Développement frontend", "Développement backend et API", "Bases de données", "Outils et pratiques", "Déploiement et services cloud"],
        "skill_extras": ["Conception adaptative", "Accessibilité web", "Gestion d'état", "Conception et normalisation des bases de données"],
        "experience_title": "EXPÉRIENCE",
        "experience": [
            {
                "date": "Mars 2026 - aujourd'hui", "role": "PROGRAMMEUR SENIOR", "company": "Transportes Sal-Ave", "location": "Nuevo Laredo, Tamaulipas",
                "bullets": [
                    "Conception et développement d'applications et de solutions logicielles adaptées aux besoins de clients de différents secteurs.",
                    "Développement et mise en œuvre de modules et de nouvelles fonctionnalités pour des applications web.",
                    "Analyse des besoins techniques et création de systèmes visant à optimiser les processus métier.",
                    "Réalisation d'analyses techniques pour évaluer la faisabilité et la portée des solutions.",
                    "Tests de performance, diagnostic et optimisation des logiciels.",
                    "Automatisation des processus afin d'améliorer l'efficacité et les performances des applications et systèmes.",
                    "Mise en œuvre d'améliorations fonctionnelles, techniques et de performance sur des solutions existantes.",
                    "Développement et intégration d'API pour faciliter la communication entre applications et services.",
                    "Intégration de ressources multimédias, notamment graphiques, audio et vidéo, dans des plateformes web.",
                    "Identification et résolution des problèmes à toutes les étapes du cycle de développement.",
                    "Maintenance et modification de logiciels pour corriger les erreurs et améliorer leur stabilité.",
                    "Revue et débogage du code afin de détecter les défauts et d'en garantir la qualité.",
                    "Collaboration avec des équipes pluridisciplinaires pour coordonner les tâches, les priorités et les délais.",
                ],
            },
            {
                "role": "TECHNICIEN EN SYSTÈMES INFORMATIQUES", "company": "Blue Duck Companies", "location": "Nuevo Laredo, Tamaulipas, Mexique",
                "bullets": [
                    "Maintien de l'ordre et de la propreté du lieu de travail.", "Mise en œuvre de processus et de procédures.",
                    "Utilisation de systèmes informatiques et technologiques.", "Réalisation de tâches administratives.", "Service à la clientèle.",
                    "Traitement des paiements et des transactions financières.", "Exécution efficace des tâches confiées.",
                    "Travail en équipe pour atteindre les objectifs de l'entreprise.", "Maintenance des bases de données et des dossiers.",
                    "Gestion des appels téléphoniques et des e-mails.", "Assistance technique générale pour les appareils électroniques.",
                    "Mise en œuvre de programmes et de solutions d'optimisation et d'amélioration continue.",
                    "Maintenance et contrôle des performances des systèmes automatisés.",
                    "Saisie de données pour la documentation technique.", "Amélioration des systèmes afin d'en accroître la fiabilité.",
                ],
            },
            {
                "role": "TRAFIC ET OPÉRATIONS", "company": "Canales Grupo Aduanal", "location": "Nuevo Laredo",
                "bullets": [
                    "Gestion efficace de la logistique internationale dans le respect des réglementations douanières.",
                    "Maîtrise des systèmes de gestion du transport et des outils de suivi des expéditions.",
                    "Résolution de problèmes complexes en temps réel pour garantir la fluidité des opérations logistiques.",
                    "Direction d'équipes pluridisciplinaires, en favorisant la collaboration et le développement professionnel de chaque membre.",
                    "Gestion des documents nécessaires à l'importation et à l'exportation des marchandises afin d'assurer la continuité des opérations.",
                ],
            },
            {
                "role": "VENDEUR AU COMPTOIR", "company": "AT&T", "location": "Nuevo Laredo, Tamaulipas, Mexique",
                "bullets": [
                    "Accueil des clients, conseil et réponse aux questions sur les produits.", "Organisation du comptoir de vente.",
                    "Enregistrement des ventes quotidiennes pour mettre à jour les bases de données de stocks.", "Traitement des paiements, échanges et retours.",
                    "Présentation des articles en vitrine afin d'attirer un maximum d'attention.", "Utilisation de caisses et de terminaux de point de vente.",
                    "Comptage des espèces et clôture de caisse à la fin de chaque poste.",
                    "Rangement et mise en rayon des marchandises pendant les périodes de faible affluence.",
                    "Traitement des paiements et gestion des retours.",
                ],
            },
        ],
        "achievements_title": "RÉALISATIONS",
        "achievements": [
            "Participation à un congrès des Nations Unies par l'intermédiaire de UN MODEL NSHMUN en 2015.",
            "Lauréat de plusieurs concours nationaux d'art oratoire.",
            "Deuxième place au niveau municipal avec le projet Load Logic lors du concours InnovaTecNM de mai 2026, dans la catégorie énergie et électromobilité, avec qualification pour la finale nationale à Mexico en septembre 2026.",
        ],
        "education_title": "FORMATION",
        "education": [
            ("CURSUS INACHEVÉ - INGÉNIERIE DES SYSTÈMES INFORMATIQUES", "Instituto Tecnológico de Nuevo Laredo, Nuevo Laredo", [
                "Études en ingénierie des systèmes informatiques interrompues au huitième semestre en raison de circonstances personnelles importantes, peu avant l'obtention du diplôme.",
                "Moyenne générale à l'époque : 85, avec les crédits généraux obtenus.",
            ]),
            ("DESIGN GRAPHIQUE NUMÉRIQUE ET INDUSTRIEL", "Instituto Anglo Español de Nuevo Laredo S.C., Nuevo Laredo", []),
            ("ENSEIGNEMENT SECONDAIRE", "Instituto Anglo Español, Nuevo Laredo", []),
            ("ENSEIGNEMENT PRIMAIRE", "Escuela Técnica Vespertina Guadalupe Mainero Juárez", []),
            ("CERTIFICAT D'ANGLAIS - B2", "TOFL, Nuevo Laredo", []),
        ],
        "languages_title": "LANGUES",
        "languages": ["Espagnol, anglais : langues principales", "Français : intermédiaire supérieur", "Italien : intermédiaire", "Portugais : notions de base", "Russe : notions de base", "Japonais : débutant"],
    },
    "pt": {
        "filename": "ReneSalinasRamosCV-PT.pdf",
        "summary_title": "RESUMO",
        "summary": "Desenvolvedor de software com experiência em aplicações web e desktop. Tenho competências de back-end em PHP e .NET e de front-end em Vue.js e Bootstrap, além de experiência em testes unitários e controle de versão. Busco uma posição que me permita continuar desenvolvendo minhas habilidades técnicas e contribuir com soluções eficazes para a equipe.",
        "tech_title": "TECNOLOGIAS",
        "skill_labels": ["Linguagens de programação", "Desenvolvimento frontend", "Desenvolvimento backend e APIs", "Bancos de dados", "Ferramentas e práticas", "Implantação e serviços em nuvem"],
        "skill_extras": ["Design responsivo", "Acessibilidade web", "Gerenciamento de estado", "Projeto e normalização de bancos de dados"],
        "experience_title": "EXPERIÊNCIA",
        "experience": [
            {
                "date": "Março de 2026 - presente", "role": "PROGRAMADOR SÊNIOR", "company": "Transportes Sal-Ave", "location": "Nuevo Laredo, Tamaulipas",
                "bullets": [
                    "Projeto e desenvolvimento de aplicações e soluções de software adaptadas às necessidades de clientes de diferentes setores.",
                    "Desenvolvimento e implementação de módulos e novos requisitos para aplicações web.",
                    "Análise de necessidades técnicas e criação de sistemas voltados à otimização de processos empresariais.",
                    "Elaboração e execução de análises técnicas para avaliar a viabilidade e o escopo das soluções.",
                    "Realização de testes de desempenho, diagnóstico e otimização de software.",
                    "Automação de processos para melhorar a eficiência e o desempenho de aplicações e sistemas.",
                    "Implementação de melhorias funcionais, técnicas e de desempenho em soluções existentes.",
                    "Desenvolvimento e integração de APIs para facilitar a comunicação entre aplicações e serviços.",
                    "Integração de recursos multimídia, como gráficos, áudio e vídeo, em plataformas web.",
                    "Identificação e resolução de problemas em todas as etapas do ciclo de desenvolvimento.",
                    "Manutenção e modificação de software para corrigir erros e melhorar a estabilidade.",
                    "Revisão e depuração de código para detectar falhas e garantir a qualidade.",
                    "Colaboração com equipes multidisciplinares para coordenar tarefas, prioridades e prazos de entrega.",
                ],
            },
            {
                "role": "TÉCNICO EM SISTEMAS DE COMPUTAÇÃO", "company": "Blue Duck Companies", "location": "Nuevo Laredo, Tamaulipas, México",
                "bullets": [
                    "Manutenção da organização e limpeza do local de trabalho.", "Implementação de processos e procedimentos.",
                    "Operação de sistemas de informática e tecnologia.", "Execução de tarefas administrativas.", "Atendimento ao cliente.",
                    "Processamento de pagamentos e transações financeiras.", "Cumprimento eficaz das tarefas atribuídas.",
                    "Trabalho em equipe para atingir os objetivos da empresa.", "Manutenção de bancos de dados e registros.",
                    "Atendimento por telefone e e-mail.", "Suporte técnico geral para dispositivos eletrônicos.",
                    "Implementação de programas e soluções de otimização e melhoria contínua.",
                    "Manutenção e controle do desempenho de sistemas automatizados.",
                    "Registro de dados para a elaboração de documentação técnica.", "Introdução de melhorias nos sistemas para aumentar sua confiabilidade.",
                ],
            },
            {
                "role": "TRÁFEGO E OPERAÇÕES", "company": "Canales Grupo Aduanal", "location": "Nuevo Laredo",
                "bullets": [
                    "Gestão eficiente da logística internacional, garantindo o cumprimento das normas aduaneiras.",
                    "Conhecimento de sistemas de gestão de transportes e ferramentas de rastreamento de remessas.",
                    "Resolução de problemas complexos em tempo real para garantir a fluidez das operações logísticas.",
                    "Liderança de equipes multidisciplinares, promovendo a colaboração e o desenvolvimento profissional de cada integrante.",
                    "Gestão da documentação necessária para a importação e exportação de mercadorias, assegurando a continuidade das operações.",
                ],
            },
            {
                "role": "VENDEDOR DE BALCÃO", "company": "AT&T", "location": "Nuevo Laredo, Tamaulipas, México",
                "bullets": [
                    "Atendimento ao cliente, orientação e esclarecimento de dúvidas sobre os produtos.", "Manutenção da organização do balcão.",
                    "Registro das vendas diárias para atualizar os bancos de dados de estoque.", "Processamento de pagamentos, trocas e devoluções.",
                    "Distribuição de artigos em vitrines para atrair o máximo de atenção.", "Uso de caixa registradora e terminais de ponto de venda.",
                    "Contagem de dinheiro e fechamento do caixa ao final de cada turno.",
                    "Reposição e organização de mercadorias em horários de menor movimento.", "Processamento de pagamentos e gestão de devoluções.",
                ],
            },
        ],
        "achievements_title": "CONQUISTAS",
        "achievements": [
            "Participante de um congresso da ONU por meio do UN MODEL NSHMUN em 2015.",
            "Vencedor de vários concursos nacionais de oratória.",
            "Segundo lugar em nível municipal com o projeto Load Logic no concurso InnovaTecNM realizado em maio de 2026, na categoria de setor energético e eletromobilidade, com classificação para a etapa nacional na Cidade do México em setembro de 2026.",
        ],
        "education_title": "FORMAÇÃO",
        "education": [
            ("CURSO INCOMPLETO - ENGENHARIA DE SISTEMAS DE COMPUTAÇÃO", "Instituto Tecnológico de Nuevo Laredo, Nuevo Laredo", [
                "Estudos de Engenharia de Sistemas de Computação interrompidos no oitavo semestre devido a circunstâncias pessoais significativas, pouco antes da conclusão.",
                "Média geral na época: 85, com os créditos gerais concluídos.",
            ]),
            ("DESIGN GRÁFICO DIGITAL E INDUSTRIAL", "Instituto Anglo Español de Nuevo Laredo S.C., Nuevo Laredo", []),
            ("ENSINO MÉDIO", "Instituto Anglo Español, Nuevo Laredo", []),
            ("ENSINO FUNDAMENTAL", "Escuela Técnica Vespertina Guadalupe Mainero Juárez", []),
            ("CERTIFICADO DE INGLÊS - B2", "TOFL, Nuevo Laredo", []),
        ],
        "languages_title": "IDIOMAS",
        "languages": ["Espanhol, inglês: idiomas principais", "Francês: intermediário superior", "Italiano: intermediário", "Português: básico", "Russo: básico", "Japonês: iniciante"],
    },
}


def styles():
    return {
        "name": ParagraphStyle("name", fontName=FONT_BOLD, fontSize=31, leading=32, textColor=DARK, spaceAfter=22),
        "section": ParagraphStyle("section", fontName=FONT_BOLD, fontSize=13, leading=15, textColor=BLUE, spaceBefore=10, spaceAfter=6),
        "job": ParagraphStyle("job", fontName=FONT, fontSize=9, leading=11, textColor=DARK, spaceBefore=7, spaceAfter=4),
        "body": ParagraphStyle("body", fontName=FONT, fontSize=8.5, leading=10.5, textColor=DARK, spaceAfter=4),
        "bullet": ParagraphStyle("bullet", fontName=FONT, fontSize=8.1, leading=9.65, leftIndent=10, firstLineIndent=-7, textColor=DARK, spaceAfter=1.5),
        "side_section": ParagraphStyle("side_section", fontName=FONT_BOLD, fontSize=12, leading=14, textColor=white, spaceBefore=9, spaceAfter=6),
        "side_body": ParagraphStyle("side_body", fontName=FONT, fontSize=8.6, leading=11.1, textColor=white, spaceAfter=4),
        "side_label": ParagraphStyle("side_label", fontName=FONT_BOLD, fontSize=8.5, leading=10.5, textColor=white, spaceBefore=3, spaceAfter=1),
        "side_item": ParagraphStyle("side_item", fontName=FONT, fontSize=8.1, leading=9.3, leftIndent=7, firstLineIndent=-6, textColor=white, spaceAfter=0.5),
        "contact": ParagraphStyle("contact", fontName=FONT, fontSize=8.8, leading=12, textColor=white, spaceAfter=2),
    }


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(escape(text), style)


def section_heading(text: str, style: ParagraphStyle) -> list:
    return [Spacer(1, 8), HRFlowable(width="100%", thickness=1.6, color=BLUE, spaceBefore=0, spaceAfter=4), p(text, style)]


def build_sidebar(data: dict, st: dict) -> list:
    story = [
        p("+1 956-620-7467", st["contact"]),
        p("rene.salinas2112@gmail.com", st["contact"]),
        p("27 Sep, 2001", st["contact"]),
        p("México", st["contact"]),
        p("portafolio-salinas-iota.vercel.app", st["contact"]),
        Spacer(1, 8),
        p(data["summary_title"], st["side_section"]),
        p(data["summary"], st["side_body"]),
        Spacer(1, 5),
        p(data["tech_title"], st["side_section"]),
    ]
    groups = [
        COMMON_SKILLS["programming"],
        COMMON_SKILLS["frontend"] + data["skill_extras"][:3],
        COMMON_SKILLS["backend"],
        COMMON_SKILLS["databases"] + [data["skill_extras"][3]],
        COMMON_SKILLS["tools"],
        COMMON_SKILLS["cloud"],
    ]
    for label, items in zip(data["skill_labels"], groups):
        story.append(p(f"{label}:", st["side_label"]))
        story.extend(p(f"• {item}", st["side_item"]) for item in items)
    return story


def build_main(data: dict, st: dict) -> list:
    story = [Paragraph("René Salinas<br/>Ramos", st["name"])]
    story += section_heading(data["experience_title"], st["section"])
    for job in data["experience"]:
        heading = ""
        if job.get("date"):
            heading += f"{escape(job['date'])}<br/>"
        heading += f"<b>{escape(job['role'])}</b>  {escape(job['company'])} | {escape(job['location'])}"
        story.append(Paragraph(heading, st["job"]))
        story.extend(p(f"• {item}", st["bullet"]) for item in job["bullets"])
    story += section_heading(data["achievements_title"], st["section"])
    story.extend(p(f"• {item}", st["bullet"]) for item in data["achievements"])
    story += section_heading(data["education_title"], st["section"])
    for title, institution, bullets in data["education"]:
        story.append(Paragraph(f"<b>{escape(title)}</b><br/>{escape(institution)}", st["job"]))
        story.extend(p(f"• {item}", st["bullet"]) for item in bullets)
    story += section_heading(data["languages_title"], st["section"])
    story.extend(p(f"• {item}", st["body"]) for item in data["languages"])
    return story


def draw_page_base(c: canvas.Canvas, page_number: int):
    c.setFillColor(GRAY)
    c.rect(0, 0, SIDEBAR_W, PAGE_H, fill=1, stroke=0)
    if page_number == 1 and PHOTO.exists():
        image = ImageReader(str(PHOTO))
        size = 150
        x = (SIDEBAR_W - size) / 2
        y = PAGE_H - size - 28
        path = c.beginPath()
        path.circle(SIDEBAR_W / 2, y + size / 2, size / 2)
        c.saveState()
        c.clipPath(path, stroke=0, fill=0)
        c.drawImage(image, x, y, size, size, preserveAspectRatio=True, mask="auto")
        c.restoreState()
        c.setStrokeColor(BLUE)
        c.setLineWidth(2)
        c.circle(SIDEBAR_W / 2, y + size / 2, size / 2, fill=0, stroke=1)
    c.setFillColor(LIGHT_GRAY)
    c.setFont(FONT, 6.5)
    c.drawRightString(PAGE_W - 22, 15, str(page_number))


def generate(locale: str, data: dict):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = OUTPUT_DIR / data["filename"]
    c = canvas.Canvas(str(output), pagesize=A4, pageCompression=1)
    c.setTitle(f"René Salinas Ramos - CV ({locale.upper()})")
    c.setAuthor("René Salinas Ramos")
    st = styles()
    sidebar = build_sidebar(data, st)
    main = build_main(data, st)
    page_number = 1

    while sidebar or main:
        draw_page_base(c, page_number)
        side_top = PAGE_H - (192 if page_number == 1 else MARGIN)
        side_frame = Frame(24, MARGIN, SIDEBAR_W - 48, side_top - MARGIN, showBoundary=0, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        main_frame = Frame(SIDEBAR_W + 25, MARGIN, PAGE_W - SIDEBAR_W - 50, PAGE_H - 2 * MARGIN, showBoundary=0, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        side_frame.addFromList(sidebar, c)
        main_frame.addFromList(main, c)
        c.showPage()
        page_number += 1
        if page_number > 8:
            raise RuntimeError(f"Unexpected pagination overflow for {locale}")

    c.save()
    copy2(output, PUBLIC_DIR / data["filename"])
    return output


if __name__ == "__main__":
    for language, resume_data in DATA.items():
        print(generate(language, resume_data))
