// assets/js/config.js

const DONATE_CONFIG = {
    promptpay: { phone: "0959394524", formatted: "095-939-4524", accNameTH: "นาย ไชยวัฒน์ ขวัญทา", accNameEN: "Mr. Chaiwat Kwanta" },
    truemoney: { icon: "https://play-lh.googleusercontent.com/6I2IYbIg4rhGUgs0UxP_5q6wmJmlBjBrlQ9f0_FAN94yOzwmrtEteifCdPPd1-chY_NX", phone: "0959394524", formatted: "095-939-4524", accNameTH: "นาย ไชยวัฒน์ ขวัญทา", accNameEN: "Mr. Chaiwat Kwanta" },
    banks: [
        { id: "kbank", icon: "https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png", nameTH: "กสิกรไทย (KBank)", nameEN: "Kasikorn Bank (KBank)", accNameTH: "นาย ไชยวัฒน์ ขวัญทา", accNameEN: "Mr. Chaiwat Kwanta", accNum: "022-8-53333-5", rawNum: "0228533335" },
        { id: "scb", icon: "https://play-lh.googleusercontent.com/j-9a3HbVZoX337-MLdkmYt75yUfN5ahis8rOnE09972cFLdVn7Z5Dzu3Guo8ldUv2H4x", nameTH: "ไทยพาณิชย์ (SCB)", nameEN: "Siam Commercial Bank (SCB)", accNameTH: "นาย ไชยวัฒน์ ขวัญทา", accNameEN: "Mr. Chaiwat Kwanta", accNum: "653-422680-7", rawNum: "6534226807" }
    ]
};

const presets = {
        thai: "ก,ข,ฃ,ค,ฅ,ฆ,ง,จ,ฉ,ช,ซ,ฌ,ญ,ฎ,ฏ,ฐ,ฑ,ฒ,ณ,ด,ต,ถ,ท,ธ,น,บ,ป,ผ,ฝ,พ,ฟ,ภ,ม,ย,ร,ล,ว,ศ,ษ,ส,ห,ฬ,อ,ฮ",
        thai_vowel: "อะ,อา,อิ,อี,อึ,อือ,อุ,อู,เอะ,เอ,แอะ,แอ,โอะ,โอ,เอาะ,ออ,เออะ,เออ,เอียะ,เอีย,เอือะ,เอือ,อัวะ,อัว,อำ,ใอ,ไอ,เอา,ฤ,ฤๅ,ฦ,ฦๅ", 
        hira: "あ,い,う,え,お,か,き,く,け,こ,さ,し,す,せ,そ,た,ち,つ,て,と,な,に,ぬ,ね,の,は,ひ,ふ,へ,ほ,ま,み,む,め,も,や,ゆ,よ,ら,り,る,れ,ろ,わ,を,ん",
        hira_daku: "が,ぎ,ぐ,げ,ご,ざ,じ,ず,ぜ,ぞ,だ,ぢ,づ,で,ど,ば,び,ぶ,べ,ぼ,ぱ,ぴ,ぷ,ぺ,ぽ",
        hira_yoon: "きゃ,きゅ,きょ,しゃ,しゅ,しょ,ちゃ,ちゅ,ちょ,にゃ,にゅ,にょ,ひゃ,ヒュ,ひょ,みゃ,みゅ,みょ,りゃ,りゅ,りょ,ぎゃ,ぎゅ,ぎょ,じゃ,じゅ,じょ,びゃ,びゅ,びょ,ぴゃ,ぴゅ,ぴょ,っ",
        kata: "ア,イ,ウ,エ,オ,カ,キ,ク,ケ,コ,サ,シ,ス,セ,ソ,タ,チ,ツ,テ,ト,ナ,ニ,ヌ,ネ,ノ,ハ,ヒ,フ,ヘ,ホ,マ,ミ,ム,メ,モ,ヤ,ユ,ヨ,ラ,リ,ル,レ,ロ,ワ,ヲ,ン",
        kata_daku: "ガ,ギ,グ,ゲ,ゴ,ザ,ジ,ズ,ゼ,ゾ,ダ,ヂ,ヅ,デ,ド,バ,ビ,ブ,ベ,ボ,パ,ピ,プ,ペ,ポ",
        kata_yoon: "キャ,キュ,キョ,シャ,シュ,ショ,チャ,チュ,チョ,ニャ,ニュ,ニョ,ヒャ,ヒュ,ヒョ,ミャ,ミュ,ミョ,リャ,リュ,リョ,ギャ,ギュ,ギョ,ジャ,ジュ,ジョ,ビャ,ビュ,ビョ,ピャ,ピュ,ピョ,ッ",
        
        // --- หมวดหมู่เพิ่มเติม (Family, Numbers, Months, Directions) ---
        jp_family: "家族,両親,父,母,兄,弟,姉,妹,祖父,祖母,夫婦,息子,娘,孫,おじ,おば,いとこ,親戚,兄弟,姉妹",
        jp_numbers: "零,一,二,三,四,五,六,七,八,九,十,百,千,万,億,兆,半,第一,番号,半分",
        jp_months: "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月,今月,先月,来月,毎月,年月,月末,月初,半月",
        jp_directions: "東,西,南,北,右,左,上,下,前,後,中,外,内,横,隣,奥,正面,向かい,斜め,周り",

        // --- JLPT N5 - N1 (ชุดที่ 1) ---
        jp_n5: "日,一,二,三,四,五,六,七,八,九,十,百,千,万,円,年,月,火,水,木,金,土,曜,時,分,半,毎,今,何,人,男,女,子,母,父,友,気,生,先,学,校,本,語,名,字,大,小,高,安,新,古,長,多,少,上,下,左,右,中,外,前,後,東,西,南,北,山,川,空,天,雨,電,車,目,耳,口,手,足,見,聞,言,話,読,書,食,飲,買,行,来,休,出,入,立,白,黒,明,広,近,遠,早",
        jp_n4: "同,事,自,社,発,者,地,業,方,新,場,員,立,開,手,力,問,代,明,動,京,目,通,言,理,体,田,主,題,意,不,作,用,度,強,公,持,野,以,思,家,世,多,正,安,院,心,界,教,文,元,重,近,考,画,海,売,知,道,集,別,物,使,品,計,死,特,私,始,朝,運,終,台,広,住,無,真,有,口,少,町,料,工,建,空,急,止,送,切,転,研,足,究,起,着,店,病,楽,神,暗",
        jp_n3: "政,議,民,連,対,部,合,市,内,相,定,回,選,米,実,関,決,全,表,戦,経,最,調,化,当,約,首,法,性,要,制,治,務,成,期,取,都,和,機,平,加,受,続,進,数,記,初,指,権,支,産,点,報,済,活,原,共,得,解,交,資,予,向,際,勝,面,告,反,判,認,参,信,件,任,情,投,等,局,打,越,過,残,念,笑,泣,怒,配,落,苦,甘,痛,冷,熱,寒,暖,暑",
        jp_n2: "党,協,総,区,領,県,設,保,改,第,結,派,府,査,委,建,各,命,挙,果,案,衛,態,厳,裁,招,捕,供,責,減,願,展,影,史,観,階,段,層,境,兵,追,街,波,草,陽,骨,臓,胃,脳,胸,吸,震,荒,植,泉,灰,砂,潮,兆,尊,敬,就,勤,退,職,辞,給,賃,雇,営,貿,易,輸,販,額,値,率,破,損,益,貧,富,税,借,貸,預,貯,券,札,硬,貨,銭,財,宝,ทอง,銅,鉱,油,炭,鋼",
        jp_n1: "氏,統,死,解,未,盟,従,創,暴,渉,司,編,華,赴,犠,巨,企,購,免,施,廃,伊,廷,籍,吉,剝,妥,脅,挑,跡,壁,邦,仙,雅,偽,偏,覇,輝,棄,滞,還,魅,嫌,嬢,微,躍,驚,嘆,幻,怪,幽,魔,狂,哀,惜,劣,卑,愚,誇,誉,辱,欺,漠,孤,慰,寂,憂,憤,憎,恨,悔,恥,悦,悟,忍,戒,慌,惧,慕,憧,慈,怠,愁,愉,惰,悼,憾,懇,懲,懸,奔,朽,凝,澄,濁,濃,潤,湿,漂,没",
        
        // --- JLPT N5 - N1 (ชุดที่ 2) ---
        jp_n5_2: "わたし,あなた,あの人,皆さん,先生,学生,会社員,医者,誰,病院,電気,部屋,机,椅子,傘,鞄,靴,辞書,雑誌,新聞,手帳,名刺,鉛筆,時計,自動車,自転車,駅,飛行機,船,電車,地下鉄,新幹線,バス,タクシー,学校,スーパー,銀行,郵便局,図書館,美術館,朝,昼,晩,夜,休み,試験,会議,映画,毎朝,毎晩,毎日,昨日,今日,明日,明後日,先週,今週,来週,毎週,先月,今月,来月,毎月,去年,今年,来年,毎年,誕生日,朝ごはん,昼ごはん,晩ごはん,パン,卵,肉,魚,野菜,果物,水,お茶,紅茶,牛乳,お酒,手紙,写真,店,庭,宿題,テニス,サッカー,花見,公園,市役所,プール,美術,喫茶店,家族,兄弟,両親,男の子,女の子",
        jp_n4_2: "答,借,貸,働,走,歩,泳,待,呼,頼,乗,降,脱,洗,歌,遊,忘,覚,落,汚,割,折,倒,焼,冷,温,暑,寒,軽,狭,早,遅,痛,眠,若,忙,静,暇,便,利,名,麗,色,交,勤,慣,並,疲,困,怒,泣,笑,喜,悲,薬,医,屋,階,段,庭,番,号,港,橋,森,林,池,島,村,都,県,区,市,州,様,仕,勉,秋,冬,春,夏,夕,晴,曇,雪,風,洋,服,味,音,声,顔,頭,首,背,指,毛,血,牛,馬,鳥",
        jp_n3_2: "麦,茶,塩,油,氷,炭,黄,緑,紫,灰,箱,袋,瓶,缶,皿,丼,箸,鍋,蓋,棚,床,壁,窓,扉,鍵,鏡,絵,筆,墨,紙,布,糸,針,袖,襟,裾,帯,客,席,荷,券,札,塔,城,宮,寺,社,神,仏,僧,祭,礼,祈,祝,婚,葬,墓,宝,玉,印,賞,像,飾,恩,罪,毒,血,汗,涙,息,髪,肌,胸,腹,腰,肩,腕,脚,膝,爪,牙,翼,羽,尾,角,巣,穴,網,縄,鎖,筒,棒,板,管,杯,鉢,釜,刃,銃,剣",
        jp_n2_2: "爆,破,砕,裂,溶,凍,腐,濁,澄,潔,汚,泥,泡,煙,粉,粒,滴,塊,筋,脈,肝,肺,腸,胆,胞,胎,膜,髄,軟,硬,鋭,鈍,渋,荒,濃,薄,厚,浅,深,甘,辛,酸,苦,臭,香,快,涼,暖,湿,燥,狂,猛,脅,威,怒,哀,惨,酷,虐,犠,牲,悼,碑,魂,狩,猟,獲,罠,餌,飼,畜,牧,耕,穫,刈,種,苗,稲,穂,茎,芽,咲,枯,散,紅,茂,伐,採,鉱,坑,錬,鋳,鍛,渦,浪,潮,津,滝,沼,崖",
        jp_n1_2: "艦,潜,撃,砲,弾,陣,盾,矛,刃,剣,丘,峰,崩,岳,渓,洞,岬,湾,沖,浜,浦,礁,霜,露,霧,霞,虹,雷,嵐,竜,巻,吹,孤,慰,寂,憂,憤,憎,恨,悔,恥,悦,悟,忍,戒,慌,惧,慕,憧,慈,怠,愁,愉,惰,憾,懇,懲,懸,奔,朽,凝,漂,没,仙,雅,偽,偏,覇,輝,棄,滞,還,魅,嫌,嬢,微,躍,驚,嘆,幻,怪,幽,魔,漠,軌,軸,旋,潤,罰,頻,繁,巧,拙,秀,劣,卑,愚,誇,誉,辱,欺",

        num_arab: "0,1,2,3,4,5,6,7,8,9",
        num_thai: "๐,๑,๒,๓,๔,๕,๖,๗,๘,๙",
        abc: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z",
        abc_low: "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z",
        kor: "ㄱ,ㄲ,ㄴ,ㄷ,ㄸ,ㄹ,ㅁ,ㅂ,ㅃ,ㅅ,ㅆ,ㅇ,ㅈ,ㅉ,ㅊ,ㅋ,ㅌ,ㅍ,ㅎ,ㅏ,ㅐ,ㅑ,ㅒ,ㅓ,ㅔ,ㅕ,ㅖ,ㅗ,ㅘ,ㅙ,ㅚ,ㅛ,ㅜ,ㅝ,ㅞ,ㅟ,ㅠ,ㅡ,ㅢ,ㅣ",
        rus: "А,Б,В,Г,Д,Е,Ё,Ж,З,И,Й,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Ъ,Ы,Ь,Э,Ю,Я",
        gre: "Α,Β,Γ,Δ,Ε,Ζ,Η,Θ,Ι,Κ,Λ,Μ,Ν,Ξ,Ο,Π,Ρ,Σ,Τ,Υ,Φ,Χ,Ψ,Ω",
        spa: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,Ñ,O,P,Q,R,S,T,U,V,W,X,Y,Z",
        ger: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ä,Ö,Ü,ß"
    };

const translations = {
        th: {
            btnDonate: "Donate", modalTitle: "💖 สนับสนุนนักพัฒนา", tabQR: "พร้อมเพย์", tabTMW: "TrueMoney", tabBank: "ธนาคาร", qrDesc: "สแกน QR Code ด้วยแอปพลิเคชันธนาคาร", btnCopy: "📋 คัดลอก",
            presetLabel: "ชุดตัวอักษร", fontLabel: "รูปแบบฟอนต์", textStyleLabel: "รูปแบบตัวอักษรสำหรับคัด",
            tsLight: "สีเทาอ่อน (Light Grey - ปกติ)", tsDotted: "ลายจุด/จำลองเส้นปะ (Dotted)", tsOutline: "เส้นขอบโปร่ง (Outline)", tsSolid: "สีดำทึบ (Solid Black)",
            textLabel: "ข้อความต้นแบบ (คั่นด้วยลูกน้ำ ,)", textPh: "พิมพ์ข้อความที่ต้องการ...", 
            customReadLabel: "💡 คำอ่านกำหนดเอง (คั่นด้วยลูกน้ำ ,)", customReadPh: "เช่น a,b,c...",
            meaningLabel: "📖 แสดงช่องคำแปล (Meaning)", customMeanPh: "ใส่คำแปลตามลำดับ เช่น นก,หมา,แมว...",
            colsLabel: "จำนวนคอลัมน์", rowsLabel: "จำนวนแถว (รวม)", dirLabel: "ทิศทางของข้อมูล", dirHoriz: "แนวนอน (ซ้ายไปขวา)", dirVert: "แนวตั้ง (บนลงล่าง)", modeLabel: "โหมดการแสดงตัวอักษร", modeModel: "เฉพาะแถว/คอลัมน์แรก (คัดตาม)", modeAll: "แสดงเรียงต่อเนื่อง (ครบทุกตัว)", modeRepeat: "วนซ้ำข้อความจนเต็มหน้ากระดาษ", 
            repeatLabelHoriz: "ทำซ้ำตัวอักษรให้เต็มแถว (แนวนอน)", repeatLabelVert: "ทำซ้ำตัวอักษรให้เต็มคอลัมน์ (แนวตั้ง)",
            layoutLabel: "ลักษณะตาราง (Layout)", laySpace: "แยกเป็นช่อง (Spaced)", layConn: "ตารางติดกัน (Connected)", layStripe: "เชื่อมเฉพาะแนวนอน (Striped Rows)", layStripeV: "เชื่อมเฉพาะแนวตั้ง (Striped Cols)",
            styleLabel: "ลวดลายในช่อง (Inner Grid)", styleSquare: "ช่องว่าง (Blank Square)", styleTian: "จีน - กากบาท (Tian Zi Ge)", styleTianDotted: "จีน - กากบาทแบบจุด (Dotted Tian Zi Ge)", styleMi: "จีน - กากบาท+ทแยง (Mi Zi Ge)", styleJiu: "จีน - 9 ช่อง (Jiu Gong Ge)", styleHui: "จีน - สี่เหลี่ยมซ้อน (Hui Zi Ge)", styleDiag: "ทแยงมุม (Diagonal X)", styleCross: "กากบาทตรง (Cross +)", styleBottom: "เส้นใต้ (Bottom Line)", styleEng: "อังกฤษ (บรรทัด 4 เส้น)", styleCircle: "เกาหลี (วงกลมโฟกัส)",
            colorLabel: "สีเส้นตาราง", pinyinLabel: "แสดงช่องคำอ่าน / Pinyin", autoReadLabel: "เติมคำอ่านอัตโนมัติ (แถบเทา = สระ)", btnExport: "📥 โหลด PDF", btnPrint: "🖨️ พิมพ์ (Print)", btnReset: "🔄 ล้างค่าทั้งหมด", optCustom: "กำหนดเอง / Custom",
            legendTxt: "* หมายเหตุ: แถบสีเทา (<span class='vowel-highlight'>a</span>) คือ สระ (Vowels)", creditTxt: "สร้างสรรค์และพัฒนาโดย",
            grpThai: "ภาษาไทย (Thai)", optThCon: "🇹🇭 พยัญชนะ (ก-ฮ)", optThVow: "🇹🇭 สระไทย (32 เสียง)",
            grpJp: "ภาษาญี่ปุ่น (Japanese)", optJpHira: "🇯🇵 ฮิรางานะ พื้นฐาน (あ-ん)", optJpHiraDaku: "🇯🇵 ฮิรางานะ เสียงขุ่น (が-ぽ)", optJpHiraYoon: "🇯🇵 ฮิรางานะ ควบกล้ำ/หยุด (きゃ-っ)",
            optJpKata: "🇯🇵 คาตาคานะ พื้นฐาน (ア-ン)", optJpKataDaku: "🇯🇵 คาตาคานะ เสียงขุ่น (ガ-ポ)", optJpKataYoon: "🇯🇵 คาตาคานะ ควบกล้ำ/หยุด (キャ-ッ)",
            
            grpJpExtra: "ภาษาญี่ปุ่น - หมวดหมู่เพิ่มเติม", optJpFam: "🇯🇵 ครอบครัว (Family)", optJpNum: "🇯🇵 ตัวเลขญี่ปุ่น (Numbers)", optJpMon: "🇯🇵 เดือน (Months)", optJpDir: "🇯🇵 ทิศทาง (Directions)",
            grpJpJLPT: "ภาษาญี่ปุ่น - JLPT (ชุดที่ 1)", optJpN5: "🇯🇵 JLPT N5 (คันจิพื้นฐาน)", optJpN4: "🇯🇵 JLPT N4", optJpN3: "🇯🇵 JLPT N3", optJpN2: "🇯🇵 JLPT N2", optJpN1: "🇯🇵 JLPT N1",
            grpJpJLPT2: "ภาษาญี่ปุ่น - JLPT (ชุดที่ 2)", optJpN5_2: "🇯🇵 JLPT N5 (คำศัพท์พื้นฐาน)", optJpN4_2: "🇯🇵 JLPT N4 (ชุด 2)", optJpN3_2: "🇯🇵 JLPT N3 (ชุด 2)", optJpN2_2: "🇯🇵 JLPT N2 (ชุด 2)", optJpN1_2: "🇯🇵 JLPT N1 (ชุด 2)",
            
            grpNum: "ตัวเลข (Numbers)", optNumArab: "🔢 เลขอารบิก (0-9)", optNumThai: "🔢 เลขไทย (๐-๙)",
            grpGlobal: "สากล (Global)", optEnUp: "🇬🇧 English Upper (A-Z)", optEnLow: "🇬🇧 English Lower (a-z)", optKor: "🇰🇷 Korean Hangul", optRus: "🇷🇺 Russian Cyrillic", optGre: "🇬🇷 Greek (Alpha-Omega)", optSpa: "🇪🇸 Spanish (Alfabeto)", optGer: "🇩🇪 German (Alphabet)",
            optFontSara: "Sarabun (ค่าเริ่มต้น)", optFontJP: "Noto Sans JP (ญี่ปุ่น)", optFontKR: "Noto Sans KR (เกาหลี)", optFontSC: "Noto Sans SC (จีน)", optFontArial: "Arial (สากล)",
            secHeader: "📝 ข้อมูลหัวกระดาษ",
            secText: "✍️ ข้อความและคำอ่าน",
            secLayout: "📏 ขนาดและทิศทาง",
            secStyle: "🎨 รูปแบบและสีสัน",
            secDisplay: "👁️ ตัวเลือกการแสดงผล",
            btnImg: "🖼️ โหลดรูป (PNG)",
            phHeaderTitle: "ชื่อหัวข้อใบงาน (ปล่อยว่างได้)",
            phHeaderName: "ชื่อ-สกุล",
            phHeaderClass: "ชั้น/เลขที่",
            loadingText: "กำลังประมวลผล...",
            paperSize: "📏 ขนาดกระดาษ",
            orientation: "🔄 แนวการวาง",
            port: "แนวตั้ง (Portrait)",
            land: "แนวนอน (Landscape)",
            altRow: "🔳 โหมดเว้นบรรทัด (สลับแถวว่าง)",
            opacity: "🌑 ความเข้มตัวอักษรคัด (Opacity)",
            btnSavePreset: "💾 บันทึก Preset ",
            btnExportPreset: "📤 ส่งออก Preset",
            btnImportPreset: "📥 นำเข้า Preset",
            savedGroup: "⭐ ชุดคำที่บันทึกไว้",
            pageN: "หน้า",
            customMeanLabel: "💡 คำแปลกำหนดเอง (คั่นด้วย ,)",
            btnDeletePreset: "🗑️ ลบ",
            modalSaveTitle: "💾 บันทึกชุดคำศัพท์",
            presetNameLabel: "ตั้งชื่อชุดคำศัพท์ของคุณ:",
            btnConfirmSave: "บันทึก",
            phPresetName: "เช่น คำศัพท์บทที่ 1..."
        },
        en: {
            btnDonate: "Donate", modalTitle: "💖 Support Developer", tabQR: "PromptPay", tabTMW: "TrueMoney", tabBank: "Banks", qrDesc: "Scan QR Code with any banking app", btnCopy: "📋 Copy",
            presetLabel: "Character Set", fontLabel: "Font Family", textStyleLabel: "Tracing Text Style",
            tsLight: "Light Grey (Default)", tsDotted: "Dotted Pattern (SVG Vector)", tsOutline: "Outline (Hollow)", tsSolid: "Solid Black",
            textLabel: "Practice Text (Comma separated)", textPh: "Type your text here...", 
            customReadLabel: "💡 Custom Readings (Comma separated)", customReadPh: "e.g., a,b,c...",
            meaningLabel: "📖 Show Meaning Box", customMeanPh: "e.g., bird,dog,cat...",
            colsLabel: "Columns", rowsLabel: "Rows (Total)", dirLabel: "Direction", dirHoriz: "Horizontal (L to R)", dirVert: "Vertical (Top to Bottom)", modeLabel: "Display Mode", modeModel: "First Row/Col Only (Trace)", modeAll: "Continuous (Show all)", modeRepeat: "Repeat to fill page", 
            repeatLabelHoriz: "Repeat char in row (Horiz)", repeatLabelVert: "Repeat char in col (Vert)", 
            layoutLabel: "Grid Layout", laySpace: "Spaced Grid", layConn: "Connected Table", layStripe: "Striped Rows", layStripeV: "Striped Cols",
            styleLabel: "Inner Grid Style", styleSquare: "Blank Square", styleTian: "Chinese (Tian Zi Ge)", styleTianDotted: "Chinese (Dotted Tian Zi Ge)", styleMi: "Chinese (Mi Zi Ge)", styleJiu: "Chinese (Jiu Gong Ge)", styleHui: "Chinese (Hui Zi Ge)", styleDiag: "Diagonal (X)", styleCross: "Cross (+)", styleBottom: "Bottom Line", styleEng: "English (4 Lines)", styleCircle: "Korean (Focus Circle)",
            colorLabel: "Grid Color", pinyinLabel: "Show Pronunciation Box", autoReadLabel: "Auto-fill Pronunciation (Gray = Vowels)", btnExport: "📥 Export PDF", btnPrint: "🖨️ Print", btnReset: "🔄 Reset All", optCustom: "Custom Text",
            legendTxt: "* Note: Gray highlight (<span class='vowel-highlight'>a</span>) indicates Vowels.", creditTxt: "Created and Developed by",
            grpThai: "Thai Language", optThCon: "🇹🇭 Thai Consonants (ก-ฮ)", optThVow: "🇹🇭 Thai Vowels (32 Sounds)",
            grpJp: "Japanese Language", optJpHira: "🇯🇵 Hiragana Base (あ-ん)", optJpHiraDaku: "🇯🇵 Hiragana Dakuten (が-ぽ)", optJpHiraYoon: "🇯🇵 Hiragana Yōon (きゃ-っ)",
            optJpKata: "🇯🇵 Katakana Base (ア-ン)", optJpKataDaku: "🇯🇵 Katakana Dakuten (ガ-ポ)", optJpKataYoon: "🇯🇵 Katakana Yōon (キャ-ッ)",
            
            grpJpExtra: "Japanese - Extra Categories", optJpFam: "🇯🇵 Family", optJpNum: "🇯🇵 Numbers", optJpMon: "🇯🇵 Months", optJpDir: "🇯🇵 Directions",
            grpJpJLPT: "Japanese - JLPT (Set 1)", optJpN5: "🇯🇵 JLPT N5 (Basic Kanji)", optJpN4: "🇯🇵 JLPT N4", optJpN3: "🇯🇵 JLPT N3", optJpN2: "🇯🇵 JLPT N2", optJpN1: "🇯🇵 JLPT N1",
            grpJpJLPT2: "Japanese - JLPT (Set 2)", optJpN5_2: "🇯🇵 JLPT N5 (Basic Vocab)", optJpN4_2: "🇯🇵 JLPT N4 (Set 2)", optJpN3_2: "🇯🇵 JLPT N3 (Set 2)", optJpN2_2: "🇯🇵 JLPT N2 (Set 2)", optJpN1_2: "🇯🇵 JLPT N1 (Set 2)",
            
            grpNum: "Numbers", optNumArab: "🔢 Arabic Numerals (0-9)", optNumThai: "🔢 Thai Numerals (๐-๙)",
            grpGlobal: "Global Languages", optEnUp: "🇬🇧 English Upper (A-Z)", optEnLow: "🇬🇧 English Lower (a-z)", optKor: "🇰🇷 Korean Hangul", optRus: "🇷🇺 Russian Cyrillic", optGre: "🇬🇷 Greek (Alpha-Omega)", optSpa: "🇪🇸 Spanish (Alfabeto)", optGer: "🇩🇪 German (Alphabet)",
            optFontSara: "Sarabun (Default)", optFontJP: "Noto Sans JP (Japanese)", optFontKR: "Noto Sans KR (Korean)", optFontSC: "Noto Sans SC (Chinese)", optFontArial: "Arial (Global)",
            secHeader: "📝 Header Information",
            secText: "✍️ Text & Data",
            secLayout: "📏 Size & Direction",
            secStyle: "🎨 Style & Colors",
            secDisplay: "👁️ Display Options",
            btnImg: "🖼️ Export PNG",
            phHeaderTitle: "Worksheet Title (Optional)",
            phHeaderName: "Name-Surname",
            phHeaderClass: "Class/No.",
            loadingText: "Processing...",
            paperSize: "📏 Paper Size",
            orientation: "🔄 Orientation",
            port: "Portrait",
            land: "Landscape",
            altRow: "🔳 Alternate Blank Rows",
            opacity: "🌑 Tracing Opacity",
            btnSavePreset: "💾 Save current as Preset",
            btnExportPreset: "📤 Export Presets",
            btnImportPreset: "📥 Import Presets",
            savedGroup: "⭐ Your Saved Presets",
            pageN: "Page",
            customMeanLabel: "💡 Custom Meanings (Comma separated)",
            btnDeletePreset: "🗑️ Delete",
            modalSaveTitle: "💾 Save Preset",
            presetNameLabel: "Enter preset name:",
            btnConfirmSave: "Save",
            phPresetName: "e.g., Lesson 1 Vocab...",
        }
    };

// Global State Variables
let currentLang = 'th';
let manualZoom = 1.0; 
let lastCalculatedRpp = 0;