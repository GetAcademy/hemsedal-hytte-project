//Normalde bu sekilde currentSupplier tutulur ve her kayit olan i database e atilir ve bir token verilir ve de sign in oldugunda veriler database de oldugu icin, senin gonderidgin verilerden token kontrol edilir ve token dondurur ve bunsan sonra tum istekler token ile yapilacaktir..
//imageFileObject:{},
//Bir file bilgilerini tutan obje gelecek bu objeyi kullanarak biz image elementimize url uretecegiz...
//category bizim model de sabit datamizda tutulacak ve biz burda id uzerinden gidecegiz.Categoriler listelenir ve dropdown ile categori seceriz, ve secilen kategoinin id sini burda tutariz ki artik istedgimiz zaman categori verilerini ortak, kategori dizisinden alabilirz..relational database

//Onemli bir nokta biz adminpage de admin resim ekleyecek ve orda imageFileObjecti alacagiz ve imageFileObject uzerinden biz controller da veya view da ona karar verecegiz imageUrl sini elde edecek fonksiyonu yazacagiz ve imageUrl i de veri eklerken imageUrl olarak ekleyecegiz...

const model={

    app:{
        page:"user",
        currentUser:{
            firstName:"Olav",
            lastName:"Johansen",
            emial:"olav@gmail.com",
            password:""
        }
    },
    inputs:{
        adminPage:{
            happening:{
                 title:{name:"", isFieldRequired:true, isValidate:false},
                description:{name:"", isFieldRequired:false},
                imageUrl:{name:"",isFieldRequired:false},
                categoryId:{name:null, isFieldRequired:true,isValidate:false},
                paymentTypeId:{name:null,isFieldRequired:true,isValidate:false},//gratis,betalt,ekstrabetalt
                happeningStartDate:{name:"",isFieldRequired:true,isValidate:false},
                happeningStartTime:{name:"",isFieldRequired:true,isValidate:false},
                happeningEndDate:{name:"",isFieldRequired:true,isValidate:false},
                happeningEndTime:{name:"",isFieldRequired:true,isValidate:false},
            announcementStartDate:{name:"",isFieldRequired:false},
            announcementStartTime:{name:"",isFieldRequired:false},
            announcementEndDate:{name:"",isFieldRequired:false},
            announcementEndTime:{name:"",isFieldRequired:false},
            webSiteUrl:{name:"",isFieldRequired:false},
             
            },
             isSubmitted:false,
            // isFocused:{
            //     title:false,
            // },
            // isBlured:{
            //     title:false,
            // },
            // isOnInput:{
            //     title:false,
            // },
            // isWarningMessage:{
            //     title:false,
            // },
            // isOnChange:{
            //     title:false,
            // }
            
        
        },
        userPage:{
            //input date-picker sadece 2022-03-29T10:01 bu formatta calisiyor buna bir cozum dusunelim....
            chosenDateFrom:"",//filtering
            chosenDateTo:"",//filtering
            chosenMonth:"",//buna gore secilen 
            isCategoryBtnClicked:false,//megamenu mantiginda category olusturmak icin bunu aliriz birkere
            isSelectedAll:false,
            isReadMoreExtraPaidBtnClicked:false,
            isReadMoreNoneExtraPaidBtnClicked:false,
            clickedHappeningId:"",
            filteredData:[],//Bunun cok bir espirisi yok kaldirmamiz gerekiyor
            filterBtnState:"this-month",
          /*categories datasi burda olacakti...bunu dusunelim...cunku degisken ve on tarafta kullanici ile etkilesim ile bir dinamizm sagliyor ve onu kullaniyoruz...dolayisi ile burda olacakti... */
            categories:[{id:1,title:"Familie og moro", isSelected:false,icon:"icon-family-svgrepo-com"},{id:2,title:"Barn og familie", isSelected:false,icon:"icon-two-childs-playing-silhouettes-svgrepo-com"},{id:3,title:"Festival", isSelected:false,icon:"icon-party-svgrepo-com"},{id:4,title:"Sport", isSelected:false,icon:"icon-sports_baseball"},{id:5,title:"Konsert", isSelected:false,icon:"icon-music"},{id:6,title:"Utstilling", isSelected:false,icon:"icon-presentation-exhibition-svgrepo-com"},{id:7,title:"Teater", isSelected:false, icon:"icon-theater-svgrepo-com"}],
            isMobilToggleMenu:false,
            
        }
    
    },


    data:{
      
        //Vi skal holde alle kategorier
        paymentTypes:[{id:1,title:"gratis",isChecked:false},{id:2,title:"betalt",isChecked:false},{id:3,title:"ekstra-betalt",isChecked:false}],
        happenings:[{
            id:1,
            title:"Pølsefest",
            description:" Pølser tilberedes og spises over hele verden, i et uvisst antall varianter. Teknikken med å fylle pølseskinn med krydret, oppmalt kjøtt er så gammel at vi kan lese om at grekerne spiste pølse i den tretusen år gamle Odysseen. Konservering og smaksetting varierer rundt om i verden, alt etter hvilke krydder som dominerer den lokale gastronomien. ",
            imageUrl:"https://images.prismic.io/govegan-no/0563de89-6f60-4d31-923d-601de225a288_1sq.png?auto=compress,format&w=800",
            categoryId:1,
            paymentTypeId:1,
            happeningStartDate:"2022-03-30",
            happeningStartTime:"11:55",
            happeningEndDate:"2022-04-18",
            happeningEndTime:"15:55",
            announcementStartDate:"2022-04-01",
            announcementStartTime:"09:00",
            announcementEndDate:"2022-04-18",
            announcementEndTime:"15:55",
            webSiteUrl:"https://blogg.millsproffpartner.no/slik-lager-du-p%C3%B8lsefesten-ingen-glemmer",
        },{
            id:2,
            title:"Spennende innendørsaktivitet for barn",
            description:" Klar, ferdig lek! På eventyrfabrikken kan alle barn springe, hoppe, rope, rote og kose seg så mye de vil. Eventyrfabrikken er Skandinavias største lekefabrikk!",
            imageUrl:"https://tellusdmsmedia.newmindmedia.com/wsimgs/237234823_4576573625727427_7642383865876437128_n_255055228.jpg",
            categoryId:2,
            paymentTypeId:2,
            happeningStartDate:"2022-04-07",
            happeningStartTime:"15:00",
            happeningEndDate:"2022-04-17",
            happeningEndTime:"15:55",
            announcementStartDate:"2022-04-11",
            announcementStartTime:"09:00",
            announcementEndDate:"2022-04-17",
            announcementEndTime:"15:55",
            webSiteUrl:"https://blogg.millsproffpartner.no/slik-lager-du-p%C3%B8lsefesten-ingen-glemmer",
        },{
            id:3,
            title:"Borealis - en festival for eksperimentell musikk",
            description:"Borealis er en festival for sjangerkryssende musikk og kunst som finner sted i mars hvert år, i Bergen.Festivalen gir deg konserter, installasjoner, verksteder, samtaler og filmer på mange av byens små og store konsertscener, kunstgallerier, kulturarenaer og andre rare steder du kanskje ikke har vært før.",
            imageUrl:"",
            categoryId:3,
            paymentTypeId:3,
            happeningStartDate:"2022-04-15",
            happeningStartTime:"09:00",
            happeningEndDate:"2022-05-27",
            happeningEndTime:"15:00",
            announcementStartDate:"2022-04-01",
            announcementStartTime:"",
            announcementEndDate:"2022-04-22",
            announcementEndTime:"",
            webSiteUrl:"https://blogg.millsproffpartner.no/slik-lager-du-p%C3%B8lsefesten-ingen-glemmer",
        },{
            id:4,
            title:"Oslo Internasjonale Kirkemusikkfestival",
            description:"Oslo Internasjonale Kirkemusikkfestival har siden starten i 2001 befestet seg som en nasjonal og internasjonal leverandør av kunstneriske prosjekter av høy kvalitet. Som kulturformidler er det festivalens viktigste oppgave å formidle kunst og musikk som berører, og som skaper rom for fordypning og innlevelse for alle, uansett tro og kirkelig tilhørighet.",
            imageUrl:"https://assets.simpleviewcms.com/simpleview/image/fetch/c_limit,f_jpg,q_64,w_1200/https://media.newmindmedia.com/TellUs/image/%3Ffile%3DOslo_Internasjonale_Kirkemusikkfestival_343704660.jpg%26dh%3D533%26dw%3D800%26cropX%3D384%26cropY%3D0%26cropH%3D1104%26cropW%3D1657%26t%3D4&.jpg",
            categoryId:3,
            paymentTypeId:3,
            happeningStartDate:"2022-04-08",
            happeningStartTime:"11:55",
            happeningEndDate:"2022-04-04",
            happeningEndTime:"15:00",
            announcementStartDate:"2022-04-01",
            announcementStartTime:"09:00",
            announcementEndDate:"2022-04-18",
            announcementEndTime:"",
            webSiteUrl:"https://blogg.millsproffpartner.no/slik-lager-du-p%C3%B8lsefesten-ingen-glemmer",
        },{
            id:5,
            title:"Lady T Band",
            description:" It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            imageUrl:"https://i.ytimg.com/vi/CN8-Uf2yrqA/maxresdefault.jpg",
            categoryId:5,
            paymentTypeId:3,
            happeningStartDate:"2022-04-12",
            happeningStartTime:"20:00",
            happeningEndDate:"2022-04-15",
            happeningEndTime:"23:55",
            announcementStartDate:"2022-04-01",
            announcementStartTime:"",
            announcementEndDate:"2022-04-18",
            announcementEndTime:"",
            webSiteUrl:"",
        },{
            id:6,
            title:"Utstillingen 'Byen og laget' på Bryggens Museum",
            description:"Nå kan du oppleve stadionstemningen på Bryggens Museum! Gjennom en aktiv og spennende utstilling presenteres byen og lagets utvikling gjennom de siste hundre årene. Opplev Bergens og Branns historiske.",
            imageUrl:"https://assets.simpleviewcms.com/simpleview/image/fetch/c_limit,f_jpg,q_64,w_587/https://media.newmindmedia.com/TellUs/image/%3Ffile%3DBryggens_Museum_fra_Clarion_1778912763.jpg%26dh%3D307%26dw%3D800%26cropX%3D0%26cropY%3D848%26cropH%3D1153%26cropW%3D3000%26t%3D4",
            categoryId:6,
            paymentTypeId:1,
            happeningStartDate:"2022-04-15",
            happeningStartTime:"11:00",
            happeningEndDate:"2022-04-26",
            happeningEndTime:"14:00",
            announcementStartDate:"2022-04-01",
            announcementStartTime:"",
            announcementEndDate:"2022-04-18",
            announcementEndTime:"",
            webSiteUrl:"",
        },{
            id:7,
            title:"Transøsterdalen 3 Dager MTB",
            description:" Vi inviterer til 3-dagers terrengsykkelritt!1.etappe 53 km.   2.etappe 73 km.   3.etappe 40 km.HVORDAN OPPLEVES TRANSØSTERDALEN? Mange som ikke har deltatt ennå, undrer seg  på hvordan de tre dagene oppleves. Alle tre etappene morsomme og har sine særpreg.Fredag med rolig start på grus og man kjører seg varm i motbakkene før gras og sti tar en inn i flotte naturopplevelser ved Savalen.",
            imageUrl:"https://www.transosterdalen.no/wp-content/uploads/2022/02/stisyklister.jpg",
            categoryId:4,
            paymentTypeId:1,
            happeningStartDate:"2022-04-12",
            happeningStartTime:"13:00",
            happeningEndDate:"2022-04-15",
            happeningEndTime:"16:30",
            announcementStartDate:"2022-04-01",
            announcementStartTime:"",
            announcementEndDate:"2022-04-18",
            announcementEndTime:"",
            webSiteUrl:"https://blogg.millsproffpartner.no/slik-lager-du-p%C3%B8lsefesten-ingen-glemmer",
        },{
            id:8,
            title:"Henrik Mestad - Alle fantastiske ting",
            description:" Kan du nevne hundre ting som gjør livet fantastisk? Tusen? Hva med en million? Mamma er på sykehus. Pappa sier at hun har «gjort noe dumt». Så jeg lager en liste. En liste over alle fantastiske ting i verden. Ting som gjør livet verdt å leve.",
            imageUrl:"https://premium.vgc.no/v2/images/96cfb043-35c7-4d03-9e33-b439232cabeb?fit=crop&format=auto&h=1536&tight=true&w=2048&s=aab28fd0a8749e715daff885b9c44998a4c3bd19",
            categoryId:7,
            paymentTypeId:3,
            happeningStartDate:"2022-04-29",
            happeningStartTime:"16:00",
            happeningEndDate:"2022-04-25",
            happeningEndTime:"19:30",
            announcementStartDate:"2022-04-01",
            announcementStartTime:"",
            announcementEndDate:"2022-05-10",
            announcementEndTime:"",
            webSiteUrl:"https://blogg.millsproffpartner.no/slik-lager-du-p%C3%B8lsefesten-ingen-glemmer",
        },{
            id:9,
            title:"Mio, Min Mio",
            description:" Den elleve år gamle eventyrlystne Bo legger ut på en lang og farefull ferd for å bekjempe ondskap og befri uskyldige barn. På veien finner han både vennskap og måter å håndtere de vanskelige tingene i livet.",
            imageUrl:"https://upload.wikimedia.org/wikipedia/commons/2/21/Mio_min_Mio.jpg",
            categoryId:1,
            paymentTypeId:1,
            happeningStartDate:"2022-04-19",
            happeningStartTime:"09:00",
            happeningEndDate:"2022-04-29",
            happeningEndTime:"15:55",
            announcementStartDate:"2022-04-01",
            announcementStartTime:"",
            announcementEndDate:"2022-04-01",
            announcementEndTime:"",
            webSiteUrl:"https://blogg.millsproffpartner.no/slik-lager-du-p%C3%B8lsefesten-ingen-glemmer",
        },{
            id:10,
            title:"Håkon Kornstad/Frode Haltli",
            description:"Håkon Kornstad, sang, saxofon  Frode Haltli, trekkspill.En gyllen anledning for å nysgjerrige lyttere til å utfordre egne forestillinger om hva jazz og klassisk sang egentlig er.Repertoaret består fortsatt av klassiske sanger og operaarier preget av improvisasjon og sterkt samspill. Denne duoen har imidlertid en åpenhet og tilstedeværelse som gjør at den skiller seg ut fra resten av Kornstads prosjekter.",
            imageUrl:"https://g.acdn.no/obscura/API/dynamic/r1/nadp/tr_1000_2000_s_f/0000/2019/08/01/3423822639/1/original/8554188.jpg?chk=B57795",
            categoryId:5,
            paymentTypeId:3,
            happeningStartDate:"2022-05-17",
            happeningStartTime:"20:00",
            happeningEndDate:"2022-04-17",
            happeningEndTime:"22:30",
            announcementStartDate:"2022-04-02",
            announcementStartTime:"",
            announcementEndDate:"2022-04-18",
            announcementEndTime:"",
            webSiteUrl:"https://blogg.millsproffpartner.no/slik-lager-du-p%C3%B8lsefesten-ingen-glemmer",
        },
    
    ],
        months: ["Januar", "Februar", "Mars", "April", "May", "Juni", "Juli","August", "September", "Oktober", "November", "Desember"],
        users:[]
    }

}

/*
Har sett på modellen deres nå; det ser bra ut! Har noen kommentarer likevel: 
 - Jeg anbefaler å lagre datoer som iso-format tekst i modellen, altså eks '2022.03.10'. Da er det lett å lage new Date(dateStr). Se gjerne denne leksjonen om hvorfor: https://getacademy.moodlecloud.com/mod/page/view.php?id=465
- jeg ville kanskje gjort start og stopp slik:
  start: {
    date: '2022-03-10',
    time: '08
    }
og tilsvarende for end. Da kan time ev. være null hvis det er hele dagen
-  isFilterTodayOn osv kan kanskje byttes ut med filterDate som inneholder iso-dato det skal filtreres på?
- inputs.userPage.dates - jeg skjønte ikke hva dere skal bruke denne til? Er dte en mellomlagring? I så fall er det bedre å bare generere alt fra scratch i view-funksjonene - men lag en funksjon for å gjøre det
 - ellers ser det veldig bra ut!
*/