import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/d39aeedb-ca02-475a-9633-00a6f3576ef3/files/17de9e95-32c0-4503-98aa-b9fedc1bf887.jpg";
const WARDROBE_IMG = "https://cdn.poehali.dev/projects/d39aeedb-ca02-475a-9633-00a6f3576ef3/files/b27863eb-bfc1-432a-9f1d-5ab457b144e4.jpg";
const LIVING_IMG = "https://cdn.poehali.dev/projects/d39aeedb-ca02-475a-9633-00a6f3576ef3/files/74076e7a-60a1-448d-a73f-6d7b4f980828.jpg";

const services = [
  { icon: "ChefHat", title: "Кухни", desc: "Проектируем и изготавливаем кухонные гарнитуры любой сложности. Фасады МДФ, массив, эмаль — подберём под ваш интерьер." },
  { icon: "DoorOpen", title: "Шкафы-купе", desc: "Встроенные и корпусные шкафы-купе с системами хранения. Максимальное использование пространства." },
  { icon: "Package", title: "Гардеробные", desc: "Гардеробные комнаты «под ключ» — от замера до установки. Системы модульного хранения." },
  { icon: "Sofa", title: "Гостиные", desc: "Стенки, горки, ТВ-зоны и полки. Цельный дизайн гостиной в едином стиле." },
  { icon: "Bed", title: "Спальни", desc: "Кровати с подъёмными механизмами, прикроватные тумбы, комоды и зеркальные поверхности." },
  { icon: "Briefcase", title: "Офисная мебель", desc: "Рабочие столы, стеллажи, ресепшн, переговорные — для бизнеса любого масштаба." },
];

const portfolio = [
  { img: HERO_IMG, category: "Кухня", title: "Кухня в стиле минимализм", area: "18 м²" },
  { img: WARDROBE_IMG, category: "Гардеробная", title: "Гардеробная с островом", area: "12 м²" },
  { img: LIVING_IMG, category: "Гостиная", title: "ТВ-зона с нишами", area: "24 м²" },
  { img: HERO_IMG, category: "Спальня", title: "Спальный гарнитур", area: "16 м²" },
  { img: WARDROBE_IMG, category: "Шкаф-купе", title: "Встроенный шкаф-купе", area: "6 м²" },
  { img: LIVING_IMG, category: "Кухня", title: "Кухня в классике", area: "22 м²" },
];

const process = [
  { step: "01", title: "Замер и консультация", desc: "Выезжаем бесплатно в любой район Екатеринбурга. Обсуждаем задачи, стиль и бюджет." },
  { step: "02", title: "Дизайн-проект", desc: "Создаём 3D-визуализацию вашей мебели. Согласовываем до полного утверждения." },
  { step: "03", title: "Производство", desc: "Изготавливаем на собственном производстве. Контроль качества на каждом этапе." },
  { step: "04", title: "Доставка и монтаж", desc: "Доставляем и монтируем «под ключ». Даём гарантию 3 года на всю мебель." },
];

const blogPosts = [
  { date: "12 марта 2026", tag: "Советы", title: "Как правильно выбрать фасады для кухни", read: "5 мин" },
  { date: "28 февраля 2026", tag: "Интерьер", title: "Гардеробная 6 м² — максимум функциональности", read: "7 мин" },
  { date: "15 февраля 2026", tag: "Производство", title: "Из чего делают качественный корпус: ЛДСП vs МДФ", read: "6 мин" },
];

const navLinks = [
  { href: "#about", label: "О компании" },
  { href: "#services", label: "Услуги" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#process", label: "Процесс" },
  { href: "#blog", label: "Блог" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#contacts", label: "Контакты" },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", type: "", comment: "" });
  const [calcData, setCalcData] = useState({ type: "kitchen", width: "", height: "", material: "ldsp" });
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const handleCalc = () => {
    const w = parseFloat(calcData.width) || 0;
    const h = parseFloat(calcData.height) || 0;
    const base: Record<string, number> = { kitchen: 32000, wardrobe: 22000, living: 28000, bedroom: 25000 };
    const baseVal = base[calcData.type] || 28000;
    const mat = calcData.material === "mdf" ? 1.35 : calcData.material === "massiv" ? 1.8 : 1;
    setCalcResult(Math.round(baseVal * (w * h / 6) * mat / 1000) * 1000);
  };

  const filters = ["Все", "Кухня", "Гардеробная", "Гостиная", "Спальня", "Шкаф-купе"];
  const filteredPortfolio = activeFilter === "Все" ? portfolio : portfolio.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/projects/d39aeedb-ca02-475a-9633-00a6f3576ef3/files/bfebc1c0-d56e-44fa-acc7-b0068428b78d.jpg" alt="Доктор Мебелис" className="w-12 h-12 object-contain" />
            <div className="flex flex-col">
              <span className="font-display text-xl font-light tracking-widest text-gold leading-none">ДОКТОР</span>
              <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground">МЕБЕЛИС</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <a href="tel:+79678589131" className="hidden lg:flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
            <Icon name="Phone" size={14} />
            <span className="font-body text-sm tracking-wide">+7 967 85 89 131</span>
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-foreground p-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-background/98 border-t border-border px-6 py-6 flex flex-col gap-5">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-base" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="tel:+79678589131" className="text-gold font-body text-sm mt-2">+7 967 85 89 131</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-end grain-overlay" id="home">
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMG} alt="Корпусная мебель на заказ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28 w-full">
          <div className="max-w-2xl">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-6 animate-fade-in" style={{animationDelay: "0.2s", animationFillMode: "both"}}>
              Производство корпусной мебели · Екатеринбург
            </p>
            <h1 className="font-display text-5xl lg:text-7xl xl:text-8xl font-light leading-[1.05] mb-8 animate-fade-up" style={{animationDelay: "0.4s", animationFillMode: "both"}}>
              Мебель,<br/>
              созданная<br/>
              <em className="text-gold not-italic">для вас</em>
            </h1>
            <p className="font-body text-base lg:text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-lg animate-fade-up" style={{animationDelay: "0.6s", animationFillMode: "both"}}>
              Проектируем и производим корпусную мебель на заказ. Кухни, гардеробные, гостиные — от замера до монтажа.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{animationDelay: "0.8s", animationFillMode: "both"}}>
              <a href="#contacts" className="btn-gold inline-block text-center">Получить консультацию</a>
              <a href="#portfolio" className="btn-outline-gold inline-block text-center">Смотреть портфолио</a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 left-0 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="hidden lg:flex justify-end">
              <div className="bg-card/90 backdrop-blur border border-border flex">
                {[["12+", "лет на рынке"], ["1400+", "проектов"], ["98%", "клиентов довольны"]].map(([val, label], i) => (
                  <div key={i} className={`px-8 py-5 text-center ${i < 2 ? "border-r border-border" : ""}`}>
                    <div className="font-display text-2xl text-gold font-light">{val}</div>
                    <div className="font-body text-xs text-muted-foreground tracking-wide mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">О компании</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light leading-tight mb-8 line-accent">
                Мы делаем мебель,<br/>которая остаётся на годы
              </h2>
              <p className="font-body text-base text-muted-foreground font-light leading-relaxed mb-6">
                Компания «Доктор Мебелис» работает в Екатеринбурге с 2015 года. За это время мы воплотили более 1400 проектов — от компактных кухонь в студиях до мебели для загородных домов.
              </p>
              <p className="font-body text-base text-muted-foreground font-light leading-relaxed mb-10">
                Собственное производство площадью 1000 м² позволяет нам контролировать каждый этап — от раскроя плиты до последнего болта при монтаже.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[["Гарантия", "2 года на всю продукцию"], ["Производство", "Собственный цех в Екатеринбурге"], ["Сроки", "От 25 рабочих дней"], ["Замер", "Бесплатно по всему городу"]].map(([t, d]) => (
                  <div key={t} className="border-t border-border pt-4">
                    <div className="font-display text-lg text-gold font-light mb-1">{t}</div>
                    <div className="font-body text-sm text-muted-foreground">{d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={WARDROBE_IMG} alt="О студии Арт-Мебель" className="w-full h-[500px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-6 hidden lg:block">
                <div className="font-display text-4xl text-gold font-light">10+</div>
                <div className="font-body text-xs text-muted-foreground tracking-wide mt-1">лет опыта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SERVICES */}
      <section id="services" className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Что мы делаем</p>
            <h2 className="font-display text-4xl lg:text-5xl font-light">Наши услуги</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((s) => (
              <div key={s.title} className="bg-background p-8 lg:p-10 hover-lift group cursor-pointer">
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-6 group-hover:border-gold transition-colors duration-300">
                  <Icon name={s.icon} size={20} className="text-muted-foreground group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="font-display text-2xl font-light mb-4 group-hover:text-gold transition-colors duration-300">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-body text-xs tracking-widest uppercase">Подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Наши работы</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light">Портфолио</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`font-body text-xs tracking-wide uppercase px-4 py-2 border transition-all duration-200 ${activeFilter === f ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/50"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPortfolio.map((p, i) => (
              <div key={i} className="portfolio-card aspect-[4/3] cursor-pointer">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <div className="overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100">
                  <div className="font-body text-xs tracking-widest uppercase text-gold mb-1">{p.category} · {p.area}</div>
                  <div className="font-display text-xl font-light text-white">{p.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline-gold">Смотреть все работы</button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PROCESS */}
      <section id="process" className="py-24 lg:py-36 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Как мы работаем</p>
            <h2 className="font-display text-4xl lg:text-5xl font-light">Процесс создания</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <div key={i} className="relative pt-8">
                <div className="step-number">{p.step}</div>
                <div className="relative z-10">
                  <div className="w-8 h-px bg-gold mb-6" />
                  <h3 className="font-display text-xl font-light mb-4">{p.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 translate-x-1/2 z-20">
                    <Icon name="ChevronRight" size={16} className="text-gold/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="#contacts" className="btn-gold inline-block">Начать проект</a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Онлайн-инструмент</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light leading-tight mb-6">
                Рассчитайте<br/>стоимость
              </h2>
              <p className="font-body text-base text-muted-foreground font-light leading-relaxed mb-8">
                Получите предварительный расчёт за 30 секунд. Точная стоимость — после выезда замерщика.
              </p>
              <div className="border border-border p-1">
                <img src={LIVING_IMG} alt="Пример мебели" className="w-full h-60 object-cover opacity-70" />
              </div>
            </div>

            <div className="bg-card border border-border p-8 lg:p-10">
              <h3 className="font-display text-2xl font-light mb-8">Параметры заказа</h3>

              <div className="space-y-5">
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">Тип мебели</label>
                  <div className="relative">
                    <select className="select-dark" value={calcData.type} onChange={e => setCalcData({...calcData, type: e.target.value})}>
                      <option value="kitchen">Кухня</option>
                      <option value="wardrobe">Гардеробная</option>
                      <option value="living">Гостиная / стенка</option>
                      <option value="bedroom">Спальный гарнитур</option>
                    </select>
                    <Icon name="ChevronDown" size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">Ширина (м)</label>
                    <input type="number" placeholder="3.0" className="input-dark" value={calcData.width} onChange={e => setCalcData({...calcData, width: e.target.value})} />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">Высота (м)</label>
                    <input type="number" placeholder="2.4" className="input-dark" value={calcData.height} onChange={e => setCalcData({...calcData, height: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">Материал фасадов</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[["ldsp", "ЛДСП"], ["mdf", "МДФ / Эмаль"], ["massiv", "Массив"]].map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => setCalcData({...calcData, material: val})}
                        className={`py-3 text-xs font-body tracking-wide border transition-all duration-200 ${calcData.material === val ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground hover:border-gold/40"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={handleCalc} className="btn-gold w-full mt-2">Рассчитать стоимость</button>

                {calcResult !== null && (
                  <div className="border border-gold/30 bg-gold/5 p-6 text-center animate-fade-in">
                    <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">Предварительная стоимость</div>
                    <div className="font-display text-4xl text-gold font-light">от {calcResult.toLocaleString()} ₽</div>
                    <div className="font-body text-xs text-muted-foreground mt-3">Точный расчёт — после бесплатного замера</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* BLOG */}
      <section id="blog" className="py-24 lg:py-36 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Статьи и советы</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light">Блог</h2>
            </div>
            <button className="btn-outline-gold self-start">Все статьи</button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <article key={i} className="bg-background border border-border p-8 hover-lift cursor-pointer group">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-body text-xs px-3 py-1 border border-gold/40 text-gold">{post.tag}</span>
                  <span className="font-body text-xs text-muted-foreground">{post.read} чтения</span>
                </div>
                <h3 className="font-display text-xl font-light leading-snug mb-6 group-hover:text-gold transition-colors duration-200">{post.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-muted-foreground">{post.date}</span>
                  <Icon name="ArrowRight" size={16} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CONTACTS + FORM */}
      <section id="contacts" className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Свяжитесь с нами</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light leading-tight mb-8">
                Начните свой<br/>проект сегодня
              </h2>
              <p className="font-body text-base text-muted-foreground font-light leading-relaxed mb-12">
                Оставьте заявку — наш дизайнер свяжется с вами в течение 30 минут и ответит на все вопросы.
              </p>

              <div className="space-y-8">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 967 85 89 131", href: "tel:+79678589131" },
                  { icon: "Mail", label: "Email", value: "zakaz@dkub.ru", href: "mailto:zakaz@dkub.ru" },
                  { icon: "MapPin", label: "Адрес", value: "г. Екатеринбург, ул. Крауля, 182", href: "#" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пн: 08:00 – 17:00", href: "#" },
                ].map(c => (
                  <a key={c.label} href={c.href} className="flex items-start gap-5 group">
                    <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 group-hover:border-gold transition-colors duration-200">
                      <Icon name={c.icon} size={16} className="text-muted-foreground group-hover:text-gold transition-colors duration-200" />
                    </div>
                    <div>
                      <div className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-1">{c.label}</div>
                      <div className="font-body text-base text-foreground">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border p-8 lg:p-10">
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-16 h-16 border border-gold flex items-center justify-center mb-6">
                    <Icon name="Check" size={28} className="text-gold" />
                  </div>
                  <h3 className="font-display text-3xl font-light mb-4">Заявка отправлена</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">Мы свяжемся с вами в течение 30 минут.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-light mb-8">Заказать консультацию</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">Ваше имя *</label>
                      <input required type="text" placeholder="Иван Иванов" className="input-dark" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">Телефон *</label>
                      <input required type="tel" placeholder="+7 (___) ___-__-__" className="input-dark" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">Тип мебели</label>
                      <div className="relative">
                        <select className="select-dark" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                          <option value="">Выберите тип</option>
                          <option value="kitchen">Кухня</option>
                          <option value="wardrobe">Гардеробная</option>
                          <option value="wardrobe-door">Шкаф-купе</option>
                          <option value="living">Гостиная / стенка</option>
                          <option value="bedroom">Спальный гарнитур</option>
                          <option value="office">Офисная мебель</option>
                          <option value="other">Другое</option>
                        </select>
                        <Icon name="ChevronDown" size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-xs tracking-widest uppercase text-muted-foreground block mb-2">Комментарий</label>
                      <textarea placeholder="Опишите ваш проект..." rows={4} className="input-dark resize-none" value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
                    </div>
                    <button type="submit" className="btn-gold w-full">Отправить заявку</button>
                    <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://cdn.poehali.dev/projects/d39aeedb-ca02-475a-9633-00a6f3576ef3/files/a2ca0d6a-bdfd-4ba5-922e-b60b3c467b7b.jpg" alt="Доктор Мебелис" className="w-9 h-9 object-cover rounded-sm" />
                <div className="flex flex-col">
                  <span className="font-display text-xl font-light tracking-widest text-gold leading-none">ДОКТОР</span>
                  <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground">МЕБЕЛИС</span>
                </div>
              </div>
              <p className="font-body text-xs text-muted-foreground max-w-xs">Производство корпусной мебели на заказ. Екатеринбург, с 2015 года.</p>
            </div>

            <div className="flex flex-wrap gap-6">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
              ))}
            </div>

            <div className="flex gap-3">
              {["Instagram", "MessageCircle", "Send"].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold transition-colors duration-200">
                  <Icon name={icon} size={14} className="text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col lg:flex-row justify-between gap-2">
            <p className="font-body text-xs text-muted-foreground">© 2026 Доктор Мебелис. Все права защищены.</p>
            <p className="font-body text-xs text-muted-foreground">ИНН 6671234567 · г. Екатеринбург</p>
          </div>
        </div>
      </footer>

    </div>
  );
}