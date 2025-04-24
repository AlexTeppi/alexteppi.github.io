// Simple Content Management System for Forest News Website

class Article {
    constructor(id, title_en, title_am, content_en, content_am, category, image, date, author) {
        this.id = id;
        this.title_en = title_en;
        this.title_am = title_am;
        this.content_en = content_en;
        this.content_am = content_am;
        this.category = category;
        this.image = image;
        this.date = date;
        this.author = author;
    }
}

class ForestNewsCMS {
    constructor() {
        this.articles = [];
        this.categories = ['Conservation', 'Climate', 'Biodiversity', 'Indigenous Knowledge', 'Technology', 'Community'];
        this.nextId = 1;
    }

    // Add a new article
    addArticle(title_en, title_am, content_en, content_am, category, image, date, author = "Alemayehu Alemu") {
        const article = new Article(
            this.nextId++,
            title_en,
            title_am,
            content_en,
            content_am,
            category,
            image,
            date,
            author
        );
        this.articles.push(article);
        this.saveArticles();
        return article;
    }

    // Get all articles
    getAllArticles() {
        return this.articles;
    }

    // Get article by ID
    getArticleById(id) {
        return this.articles.find(article => article.id === id);
    }

    // Get articles by category
    getArticlesByCategory(category) {
        return this.articles.filter(article => article.category === category);
    }

    // Get featured articles (most recent 3)
    getFeaturedArticles() {
        return this.articles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
    }

    // Get latest articles (next 6 after featured)
    getLatestArticles() {
        return this.articles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(3, 9);
    }

    // Update an article
    updateArticle(id, updates) {
        const index = this.articles.findIndex(article => article.id === id);
        if (index !== -1) {
            this.articles[index] = { ...this.articles[index], ...updates };
            this.saveArticles();
            return this.articles[index];
        }
        return null;
    }

    // Delete an article
    deleteArticle(id) {
        const index = this.articles.findIndex(article => article.id === id);
        if (index !== -1) {
            this.articles.splice(index, 1);
            this.saveArticles();
            return true;
        }
        return false;
    }

    // Save articles to localStorage
    saveArticles() {
        localStorage.setItem('forestNewsArticles', JSON.stringify(this.articles));
        localStorage.setItem('forestNewsNextId', this.nextId.toString());
    }

    // Load articles from localStorage
    loadArticles() {
        const savedArticles = localStorage.getItem('forestNewsArticles');
        const savedNextId = localStorage.getItem('forestNewsNextId');
        
        if (savedArticles) {
            this.articles = JSON.parse(savedArticles);
        }
        
        if (savedNextId) {
            this.nextId = parseInt(savedNextId);
        }
    }

    // Initialize with sample content if empty
    initializeWithSampleContent() {
        if (this.articles.length === 0) {
            // Sample articles
            this.addArticle(
                "New Conservation Efforts in Sheka Forest Show Promising Results",
                "በሼካ ደን ውስጥ አዲስ የጥበቃ ጥረቶች ተስፋ ሰጪ ውጤቶችን አሳይተዋል",
                "Recent conservation initiatives in Ethiopia's UNESCO-recognized Sheka Forest Biosphere Reserve are showing positive impacts on biodiversity and local communities. The collaborative efforts between government agencies, local communities, and international organizations have led to a significant reduction in illegal logging and an increase in forest cover over the past year.\n\nThe Sheka Forest, located in southwestern Ethiopia, is one of the country's last remaining tropical rainforests and home to numerous endemic species. The new conservation approach focuses on community-based forest management, where local residents are trained and empowered to protect their forest resources while benefiting economically from sustainable practices.\n\n\"We've seen a 30% decrease in illegal forest activities since implementing the community guardian program,\" says Alemayehu Alemu, a forestry expert working with the Ethiopian government in Teppi town. \"More importantly, local communities now see the forest as an asset to protect rather than just a resource to exploit.\"",
                "በዩኔስኮ እውቅና በተሰጠው የኢትዮጵያ የሼካ ደን ስነ-ህይወት ክልል ውስጥ የቅርብ ጊዜ የጥበቃ ተነሳሽነቶች በስነ-ህይወት ብዝሃነት እና በአካባቢ ማህበረሰቦች ላይ አዎንታዊ ተጽዕኖዎችን እያሳዩ ነው። በመንግስት ኤጀንሲዎች፣ በአካባቢ ማህበረሰቦች እና በዓለም አቀፍ ድርጅቶች መካከል ያለው የጋራ ጥረት ባለፈው ዓመት ውስጥ ህገወጥ የደን ምርት ስራን በከፍተኛ ሁኔታ ለመቀነስ እና የደን ሽፋንን ለማሳደግ አስችሏል።\n\nበደቡብ ምዕራብ ኢትዮጵያ የሚገኘው የሼካ ደን ከአገሪቱ የመጨረሻዎቹ የሚቀሩ የትሮፒካል ዝናብ ደኖች አንዱ እና ለበርካታ endemic ዝርያዎች መኖሪያ ነው። አዲሱ የጥበቃ አቀራረብ በማህበረሰብ ላይ የተመሰረተ የደን አያያዝ ላይ ያተኩራል፣ በዚህም የአካባቢ ነዋሪዎች የደን ሀብታቸውን ለመጠበቅ ሥልጠና እና ብቃት ሲሰጣቸው በዘላቂ ልምዶች ኢኮኖሚያዊ ጥቅም ያገኛሉ።\n\n\"የማህበረሰብ ጠባቂ ፕሮግራሙን ከተግበርን ጀምሮ በህገወጥ የደን ስራዎች ላይ 30% ቅናሽ አይተናል\" ይላሉ በጠፍጢ ከተማ ከኢትዮጵያ መንግስት ጋር የሚሰሩ የደን ባለሙያ አለማየሁ አለሙ። \"ከዚህም በላይ፣ የአካባቢ ማህበረሰቦች አሁን ደኑን ለመጠቀም ብቻ ሳይሆን ለመጠበቅ እንደሚያስፈልግ ሀብት ይመለከታሉ።\"",
                "Conservation",
                "images/sheka-forest.jpg",
                "April 20, 2025"
            );

            this.addArticle(
                "Climate Change Impacts on Ethiopian Forests: New Research Findings",
                "የአየር ንብረት ለውጥ በኢትዮጵያ ደኖች ላይ ያለው ተጽዕኖ፡ አዲስ የምርምር ውጤቶች",
                "A new study reveals how climate change is affecting Ethiopia's forest ecosystems and what this means for conservation efforts. Researchers from Ethiopian universities and international institutions have documented significant shifts in vegetation patterns, flowering times, and species distribution across the country's diverse forest regions.\n\nThe study, published in the Journal of African Ecology, highlights that temperature increases and changing rainfall patterns are already affecting the Sheka Forest Biosphere Reserve, with some plant species flowering earlier and others struggling to adapt to new conditions.\n\n\"We're seeing concerning changes in the forest's microclimate,\" explains lead researcher Dr. Abebe Bekele. \"Some endemic species have shifted their ranges upslope by as much as 30 meters in elevation over the past decade, which could eventually lead to habitat compression and potential extinctions.\"\n\nThe research emphasizes the need for climate-adaptive conservation strategies that account for these ongoing changes. Recommendations include establishing ecological corridors to facilitate species migration, protecting climate refugia, and integrating climate projections into forest management plans.",
                "አዲስ ጥናት የአየር ንብረት ለውጥ የኢትዮጵያን የደን ስነ-ምህዳሮች እንዴት እየተጎዳ እንደሆነ እና ይህ ለጥበቃ ጥረቶች ምን ማለት እንደሆነ ይፋ አድርጓል። ከኢትዮጵያ ዩኒቨርሲቲዎች እና ከዓለም አቀፍ ተቋማት የመጡ ተመራማሪዎች በአገሪቱ የተለያዩ የደን አካባቢዎች ውስጥ በእጽዋት ቅርጽ፣ በአበባ ጊዜያት እና በዝርያዎች ስርጭት ላይ ጉልህ ለውጦችን አስፍረዋል።\n\nበአፍሪካ ስነ-ምህዳር መጽሔት የታተመው ጥናት፣ የሙቀት መጨመር እና የዝናብ ስርጭት ለውጦች አስቀድሞውኑ በሼካ ደን ስነ-ህይወት ክልል ላይ ተጽዕኖ እያሳደሩ እንደሆነ ያመለክታል፣ አንዳንድ የእጽዋት ዝርያዎች ቀደም ብለው ያብባሉ እና ሌሎች ደግሞ ከአዲስ ሁኔታዎች ጋር ለመላመድ ይታገላሉ።\n\n\"በደኑ ማይክሮክላይሜት ላይ አሳሳቢ ለውጦችን እያየን ነው\" ሲሉ ዋና ተመራማሪ ዶ/ር አበበ በቀለ ያብራራሉ። \"አንዳንድ ነባር ዝርያዎች ባለፉት አስር ዓመታት ውስጥ እስከ 30 ሜትር ከፍታ ድረስ ወደ ላይ ተንቀሳቅሰዋል፣ ይህም በመጨረሻ ለመኖሪያ አካባቢ መጨናነቅ እና ለሊጠፉ የሚችሉ ዝርያዎች ሊያመራ ይችላል።\"\n\nምርምሩ እነዚህን ቀጣይነት ያላቸው ለውጦችን ግምት ውስጥ የሚያስገቡ የአየር ንብረት-ተስማሚ የጥበቃ ስትራቴጂዎችን የማዘጋጀት አስፈላጊነትን ያጎላል። ምክረ-ሀሳቦቹ የዝርያዎችን ፍልሰት ለማመቻቸት ስነ-ምህዳራዊ ኮሪደሮችን ማቋቋም፣ የአየር ንብረት መጠለያዎችን መጠበቅ እና የአየር ንብረት ትንበያዎችን ከደን አያያዝ እቅዶች ጋር ማዋሃድን ያካትታሉ።",
                "Climate",
                "images/climate-change.jpg",
                "April 18, 2025"
            );

            this.addArticle(
                "Indigenous Forest Management Practices Gain Recognition",
                "የአካባቢ የደን አያያዝ ልምዶች እውቅና አግኝተዋል",
                "Traditional forest management practices by indigenous communities in Ethiopia are increasingly being recognized for their effectiveness in sustainable conservation. A recent international conference highlighted how the Sheka community's ancestral knowledge has contributed to preserving one of Ethiopia's most biodiverse forests.\n\nFor generations, the indigenous communities of Sheka zone have maintained sacred forest areas, practiced selective harvesting, and used traditional ecological knowledge to manage forest resources sustainably. These practices, once dismissed by conventional forestry science, are now being documented and integrated into official conservation strategies.\n\n\"Our ancestors understood the forest as a living system with its own rhythms and relationships,\" explains Elder Tadesse Gebre, a knowledge keeper from the Sheka community. \"They taught us which plants could be harvested and when, which trees were homes to important spirits, and how to read the forest's health through indicator species.\"\n\nThe Ethiopian Forestry Commission has launched a new initiative to document these indigenous practices and incorporate them into national forest management guidelines. The program includes training for forestry officials on indigenous knowledge systems and creating partnerships with community elders.",
                "በኢትዮጵያ የአካባቢ ማህበረሰቦች ባህላዊ የደን አያያዝ ልምዶች በዘላቂ ጥበቃ ውስጥ ላላቸው ውጤታማነት እየጨመረ እውቅና እያገኙ ነው። የቅርብ ጊዜ ዓለም አቀፍ ኮንፈረንስ የሼካ ማህበረሰብ የቅድመ-አያት እውቀት ከኢትዮጵያ በጣም ብዝሃ-ህይወት ካላቸው ደኖች አንዱን ለመጠበቅ እንዴት አስተዋጽኦ እንዳደረገ አጉልቷል።\n\nለትውልዶች፣ የሼካ ዞን የአካባቢ ማህበረሰቦች ቅዱስ የደን አካባቢዎችን ጠብቀዋል፣ ምርጫዊ ምርት አሰባስበዋል፣ እና የደን ሀብቶችን በዘላቂነት ለማስተዳደር ባህላዊ ስነ-ምህዳራዊ እውቀትን ተጠቅመዋል። እነዚህ ልምዶች፣ አንድ ጊዜ በባህላዊ የደን ሳይንስ የተቃወሙ፣ አሁን እየተመዘገቡ እና ወደ ኦፊሴላዊ የጥበቃ ስትራቴጂዎች እየተዋሃዱ ናቸው።\n\n\"የእኛ አያቶች ደኑን በራሱ ምት እና ግንኙነቶች ያለው ህያው ስርዓት እንደሆነ ተረድተዋል\" ሲሉ ከሼካ ማህበረሰብ የመጡ የእውቀት ጠባቂ ሽማግሌ ታደሰ ገብሬ ያብራራሉ። \"የትኞቹ እጽዋቶች መሰብሰብ እንደሚችሉ እና መቼ፣ የትኞቹ ዛፎች ለአስፈላጊ መንፈሶች መኖሪያ እንደሆኑ፣ እና የደኑን ጤንነት በአመልካች ዝርያዎች አማካኝነት እንዴት ማንበብ እንደሚቻል አስተምረውናል።\"\n\nየኢትዮጵያ የደን ኮሚሽን እነዚህን የአካባቢ ልምዶች ለመመዝገብ እና በብሔራዊ የደን አያያዝ መመሪያዎች ውስጥ ለማካተት አዲስ ተነሳሽነት ጀምሯል። ፕሮግራሙ ለደን ባለሙያዎች ስለ አካባቢ እውቀት ስርዓቶች ሥልጠና እና ከማህበረሰብ ሽማግሌዎች ጋር አጋርነት መፍጠርን ያካትታል።",
                "Indigenous Knowledge",
                "images/indigenous-knowledge.jpg",
                "April 15, 2025"
            );

            this.addArticle(
                "AI Technologies Helping Monitor Forest Health in Ethiopia",
                "በኢትዮጵያ የደን ጤንነትን ለመከታተል የሚረዱ የሰው ሰራሽ ብልህነት ቴክኖሎጂዎች",
                "New AI-powered monitoring systems are being deployed to track forest health and detect illegal logging activities in real-time across Ethiopia's protected forests. The innovative technology combines satellite imagery, ground sensors, and machine learning algorithms to provide comprehensive monitoring capabilities even in remote areas.\n\nThe system, developed through a partnership between Ethiopian tech startups and international conservation organizations, can detect changes in forest cover, identify signs of illegal activities, and even predict potential threats based on historical patterns.\n\n\"This technology is transforming how we protect our forests,\" says Alemayehu Alemu, a forestry expert working in the Sheka zone. \"Previously, we might discover illegal logging days or weeks after it occurred. Now we receive alerts within hours, allowing for rapid response.\"\n\nThe AI system has been particularly effective in the Sheka Forest Biosphere Reserve, where it has helped authorities intercept several illegal logging operations over the past six months. The technology also monitors forest health indicators such as canopy density, vegetation stress, and biodiversity metrics.\n\nWhat makes the system especially valuable is its ability to function with limited internet connectivity, a common challenge in remote forest areas. The ground sensors can store data locally and transmit it when connectivity becomes available, ensuring continuous monitoring even in challenging conditions.",
                "አዲስ በሰው ሰራሽ ብልህነት የሚሰሩ የክትትል ስርዓቶች በኢትዮጵያ የተጠበቁ ደኖች ውስጥ የደን ጤንነትን ለመከታተል እና ህገወጥ የደን ምርት ስራዎችን በእውነተኛ ጊዜ ለመለየት እየተሰማሩ ነው። አዲሱ ቴክኖሎጂ የሳተላይት ምስሎችን፣ የመሬት ላይ ሰንሰሮችን፣ እና የማሽን ትምህርት አልጎሪዝሞችን በማጣመር በርቀት ባሉ አካባቢዎች እንኳ ሁሉን አቀፍ የክትትል አቅሞችን ይሰጣል።\n\nበኢትዮጵያ የቴክኖሎጂ ተነሳሽ ድርጅቶች እና ዓለም አቀፍ የጥበቃ ድርጅቶች መካከል ባለው ትብብር የተዘጋጀው ስርዓት፣ በደን ሽፋን ላይ ያሉ ለውጦችን መለየት፣ የህገወጥ እንቅስቃሴዎች ምልክቶችን መለየት፣ እና በታሪካዊ ስርዓቶች ላይ በመመስረት ሊከሰቱ የሚችሉ ስጋቶችን መተንበይ ይችላል።\n\n\"ይህ ቴክኖሎጂ ደኖቻችንን እንዴት እንደምንጠብቅ እየቀየረ ነው\" ሲሉ በሼካ ዞን የሚሰሩ የደን ባለሙያ አለማየሁ አለሙ። \"ከዚህ በፊት፣ ህገወጥ የደን ምርት ከተከሰተ ቀናት ወይም ሳምንታት በኋላ ልናገኘው እንችል ነበር። አሁን በሰዓታት ውስጥ ማሳወቂያዎችን እንቀበላለን፣ ይህም ፈጣን ምላሽ እንዲኖር ያስችላል።\"\n\nየሰው ሰራሽ ብልህነት ስርዓቱ በሼካ ደን ስነ-ህይወት ክልል ውስጥ በተለይ ውጤታማ ሆኗል፣ በዚያም ባለስልጣናት ባለፉት ስድስት ወራት ውስጥ በርካታ ህገወጥ የደን ምርት ስራዎችን እንዲያቋርጡ ረድቷቸዋል። ቴክኖሎጂው እንደ ካኖፒ ጥግግት፣ የእጽዋት ጭንቀት፣ እና የስነ-ህይወት ብዝሃነት መለኪያዎች ያሉ የደን ጤንነት አመልካቾችን ይከታተላል።\n\nስርዓቱን በተለይ ዋጋ ያለው የሚያደርገው በውስን የኢንተርኔት ግንኙነት፣ በርቀት ባሉ የደን አካባቢዎች የተለመደ ፈተና፣ የመስራት ችሎታው ነው። የመሬት ላይ ሰንሰሮች ውሂብን በአካባቢው ማከማቸት እና ግንኙነት ሲኖር ማስተላለፍ ይችላሉ፣ ይህም በአስቸጋሪ ሁኔታዎች እንኳ ቀጣይነት ያለው ክትትል እንዲኖር ያረጋግጣል።",
                "Technology",
                "images/ai-forest-monitoring.jpg",
                "April 12, 2025"
            );

            this.addArticle(
                "Local Communities Lead Conservation Efforts in Teppi Region",
                "የአካባቢ ማህበረሰቦች በጠፍጢ አካባቢ የጥበቃ ጥረቶችን ይመራሉ",
                "Communities around Teppi are taking the lead in forest conservation through innovative community-based management approaches. A coalition of seven villages has established a community conservation area that protects over 5,000 hectares of forest while supporting sustainable livelihoods.\n\nThe initiative, known as the Teppi Community Forest Conservancy, represents a new model of conservation that places local communities at the center of decision-making and management. Village committees oversee forest patrols, sustainable harvesting of non-timber forest products, and reforestation efforts.\n\n\"This is our forest, and we are its guardians,\" says Birtukan Mengistu, chairperson of the conservancy. \"For generations, these forests have provided us with medicine, food, and spiritual connection. Now we are organizing to ensure they survive for future generations.\"\n\nThe conservancy has established clear guidelines for sustainable use of forest resources, including designated zones for different activities such as honey production, medicinal plant harvesting, and strict protection. Community members receive training in sustainable harvesting techniques, value addition for forest products, and conservation monitoring.\n\nThe model has attracted attention from conservation organizations and government agencies as a potential blueprint for community-led conservation across Ethiopia. Initial assessments show increased forest cover and wildlife sightings in the conservancy area, along with improved livelihoods for participating communities.",
                "በጠፍጢ አካባቢ ያሉ ማህበረሰቦች በአዲስ በማህበረሰብ ላይ የተመሰረተ የአያያዝ አቀራረቦች አማካኝነት በደን ጥበቃ ውስጥ መሪነትን እየያዙ ነው። የሰባት መንደሮች ጥምረት ከ5,000 ሄክታር በላይ ደን የሚጠብቅ እና ዘላቂ ኑሮን የሚደግፍ የማህበረሰብ ጥበቃ አካባቢን አቋቁሟል።\n\nየጠፍጢ ማህበረሰብ ደን ጥበቃ በመባል የሚታወቀው ተነሳሽነት፣ የአካባቢ ማህበረሰቦችን በውሳኔ አሰጣጥ እና አያያዝ ማዕከል የሚያደርግ አዲስ የጥበቃ ሞዴል ይወክላል። የመንደር ኮሚቴዎች የደን ቁጥጥሮችን፣ ከደን ምርት ውጭ ያሉ ምርቶችን ዘላቂ ምርት፣ እና የደን ዳግም ማልማት ጥረቶችን ይቆጣጠራሉ።\n\n\"ይህ የእኛ ደን ነው፣ እና እኛ ጠባቂዎቹ ነን\" ሲሉ የጥበቃው ሊቀመንበር ብርቱካን መንግስቱ። \"ለትውልዶች፣ እነዚህ ደኖች መድሃኒት፣ ምግብ፣ እና መንፈሳዊ ግንኙነት ሰጥተውናል። አሁን ለወደፊት ትውልዶች እንዲኖሩ ለማረጋገጥ እየተደራጀን ነው።\"\n\nጥበቃው እንደ ማር ምርት፣ የመድሃኒት እጽዋት ምርት፣ እና ጥብቅ ጥበቃ ያሉ ለተለያዩ እንቅስቃሴዎች የተመደቡ ዞኖችን ጨምሮ ለደን ሀብቶች ዘላቂ አጠቃቀም ግልጽ መመሪያዎችን አዘጋጅቷል። የማህበረሰብ አባላት በዘላቂ የምርት ቴክኒኮች፣ ለደን ምርቶች የዋጋ ጭማሪ፣ እና የጥበቃ ክትትል ሥልጠና ይቀበላሉ።\n\nሞዴሉ በኢትዮጵያ ውስጥ በማህበረሰብ የሚመራ ጥበቃ እንደ ሊሆን የሚችል ንድፍ ከጥበቃ ድርጅቶች እና መንግስታዊ ኤጀንሲዎች ትኩረት ስቧል። የመጀመሪያ ግምገማዎች በጥበቃው አካባቢ የጨመረ የደን ሽፋን እና የዱር እንስሳት ምልከታዎችን ያሳያሉ፣ እንዲሁም ለተሳታፊ ማህበረሰቦች የተሻሻለ ኑሮ።",
                "Community",
                "images/community-conservation.jpg",
                "April 10, 2025"
            );

            this.addArticle(
                "Rare Species Discovered in Sheka Forest Biosphere Reserve",
                "በሼካ ደን ስነ-ህይወት ክልል ውስጥ ሬር ዓይነቶች ተገኝተዋል",
                "Researchers have identified several previously undocumented plant and animal species in Ethiopia's Sheka Forest, highlighting its biodiversity importance. A recent biological survey conducted by a team of Ethiopian and international scientists has revealed at least three plant species and two amphibian species that are new to science.\n\nThe discoveries include a new species of orchid with unusual blue flowers, a tree frog with distinctive markings, and a small shrub with potential medicinal properties. Preliminary genetic analysis suggests these species may be endemic to the Sheka Forest region, meaning they are found nowhere else on Earth.\n\n\"These findings underscore the exceptional biodiversity value of the Sheka Forest,\" says Dr. Frehiwot Tadesse, lead botanist on the research team. \"Each new species discovery provides additional evidence for why this ecosystem deserves the strongest possible protection.\"\n\nThe research team spent three months conducting intensive surveys across different elevation zones within the forest, using both traditional field methods and environmental DNA sampling to detect elusive species. Local knowledge from indigenous community members was instrumental in locating several of the new species.\n\nThe discoveries come at a critical time, as parts of the Sheka Forest face increasing pressure from agricultural expansion and resource extraction. Conservation organizations are using these findings to advocate for expanded protection of the forest and stricter enforcement of existing regulations.",
                "ተመራማሪዎች በኢትዮጵያ ሼካ ደን ውስጥ ከዚህ በፊት ያልተመዘገቡ በርካታ የእጽዋት እና የእንስሳት ዓይነቶችን ለይተዋል፣ ይህም የስነ-ህይወት ብዝሃነት ጠቀሜታውን ያጎላል። በኢትዮጵያ እና ዓለም አቀፍ ሳይንቲስቶች ቡድን የተካሄደው የቅርብ ጊዜ ስነ-ህይወታዊ ዳሰሳ ቢያንስ ሶስት የእጽዋት ዓይነቶችን እና ሁለት የአምፊቢያን ዓይነቶችን ለሳይንስ አዲስ የሆኑ መኖራቸውን ይፋ አድርጓል።\n\nግኝቶቹ ያልተለመደ ሰማያዊ አበቦች ያሉት አዲስ የኦርኪድ ዓይነት፣ ልዩ ምልክቶች ያሉት የዛፍ ጓጉንቸር፣ እና ሊሆን የሚችል የመድሃኒት ባህሪያት ያለው ትንሽ ቁጥቋጦን ያካትታሉ። የመጀመሪያ ደረጃ የዘረመል ትንተና እነዚህ ዓይነቶች ለሼካ ደን አካባቢ ብቻ ልዩ ሊሆኑ እንደሚችሉ ያመለክታል፣ ይህም ማለት በምድር ላይ በሌላ ቦታ አይገኙም ማለት ነው።\n\n\"እነዚህ ግኝቶች የሼካ ደን ልዩ የስነ-ህይወት ብዝሃነት ዋጋን ያጎላሉ\" ሲሉ በምርምር ቡድኑ ውስጥ ዋና ቦታኒስት የሆኑት ዶ/ር ፍሬህይወት ታደሰ። \"እያንዳንዱ አዲስ ዓይነት ግኝት ይህ ስነ-ምህዳር ለምን እጅግ ከፍተኛውን ጥበቃ የሚገባው እንደሆነ ተጨማሪ ማስረጃ ይሰጣል።\"\n\nየምርምር ቡድኑ በደኑ ውስጥ በተለያዩ የከፍታ ዞኖች ጠንካራ ዳሰሳዎችን በማካሄድ ሶስት ወራትን አሳልፏል፣ ለመገኘት አስቸጋሪ የሆኑ ዓይነቶችን ለመለየት ባህላዊ የመስክ ዘዴዎችን እና የአካባቢ ዲኤንኤ ናሙና መውሰድን በመጠቀም። ከአካባቢ ማህበረሰብ አባላት የመጣ የአካባቢ እውቀት ከአዲሶቹ ዓይነቶች በርካቶቹን ለማግኘት ጠቃሚ ነበር።\n\nግኝቶቹ የሚመጡት በወሳኝ ጊዜ ነው፣ የሼካ ደን ክፍሎች ከግብርና ማስፋፋት እና ሀብት ማውጣት እየጨመረ ካለው ጫና ጋር እየገጠሙ ነው። የጥበቃ ድርጅቶች እነዚህን ግኝቶች የደኑን ጥበቃ ለማስፋፋት እና ነባር ደንቦችን በጥብቅ ለማስከበር ለመሟገት እየተጠቀሙባቸው ነው።",
                "Biodiversity",
                "images/rare-species.jpg",
                "April 8, 2025"
            );
        }
    }
}

// Initialize the CMS
document.addEventListener('DOMContentLoaded', function() {
    // Create global CMS instance
    window.forestNewsCMS = new ForestNewsCMS();
    
    // Load saved articles or initialize with sample content
    window.forestNewsCMS.loadArticles();
    
    if (window.forestNewsCMS.articles.length === 0) {
        window.forestNewsCMS.initializeWithSampleContent();
    }
    
    // Populate featured articles
    populateFeaturedArticles();
    
    // Populate latest articles
    populateLatestArticles();
});

// Function to populate featured articles
function populateFeaturedArticles() {
    const cms = window.forestNewsCMS;
    const featuredArticles = cms.getFeaturedArticles();
    const newsGrid = document.querySelector('.news-grid');
    
    if (!newsGrid || !featuredArticles.length) return;
    
    // Clear existing content
    newsGrid.innerHTML = '';
    
    // Add featured articles
    featuredArticles.forEach(article => {
        const articleHTML = `
            <article class="news-card" data-article-id="${article.id}">
                <div class="news-image">
                    <img src="${article.image}" alt="${article.title_en}">
                </div>
                <div class="news-content">
                    <span class="category">${article.category}</span>
                    <h3 class="en">${article.title_en}</h3>
                    <h3 class="am">${article.title_am}</h3>
                    <p class="en">${article.content_en.substring(0, 150)}...</p>
                    <p class="am">${article.content_am.substring(0, 150)}...</p>
                    <div class="news-meta">
                        <span class="date">${article.date}</span>
                        <a href="article.html?id=${article.id}" class="read-more en">Read More</a>
                        <a href="article.html?id=${article.id}" class="read-more am">ተጨማሪ ያንብቡ</a>
                    </div>
                </div>
            </article>
        `;
        
        newsGrid.innerHTML += articleHTML;
    });
}

// Function to populate latest articles
function populateLatestArticles() {
    const cms = window.forestNewsCMS;
    const latestArticles = cms.getLatestArticles();
    const newsList = document.querySelector('.news-list');
    
    if (!newsList || !latestArticles.length) return;
    
    // Clear existing content
    newsList.innerHTML = '';
    
    // Add latest articles
    latestArticles.forEach(article => {
        const articleHTML = `
            <article class="news-item" data-article-id="${article.id}">
                <div class="news-item-image">
                    <img src="${article.image}" alt="${article.title_en}">
                </div>
                <div class="news-item-content">
                    <span class="category">${article.category}</span>
                    <h3 class="en">${article.title_en}</h3>
                    <h3 class="am">${article.title_am}</h3>
                    <p class="en">${article.content_en.substring(0, 100)}...</p>
                    <p class="am">${article.content_am.substring(0, 100)}...</p>
                    <div class="news-meta">
                        <span class="date">${article.date}</span>
                        <a href="article.html?id=${article.id}" class="read-more en">Read More</a>
                        <a href="article.html?id=${article.id}" class="read-more am">ተጨማሪ ያንብቡ</a>
                    </div>
                </div>
            </article>
        `;
        
        newsList.innerHTML += articleHTML;
    });
}
