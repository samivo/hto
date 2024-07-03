class VariableData {

    static backendUrl: string = "https://hto2.klu.fi/persons";
    static backendSkywinUrl: string = "https://hto2.klu.fi/skywin";
    static backendNotamUrl: string = "https://hto2.klu.fi/notam";

    static NotamUrl: string = "https://www.ais.fi/bulletins/efinen.htm#EFKU";

    static notamStartIndex: string = 'name="EFKU"';
    static notamEndIndex: string = 'name="EFLP"';

    //For sunset calculations
    static dzCoordinatesLat: number = 63.011;
    static dzCoordinatesLong: number = 27.79;

    static personTypes: string[] = [
        "Kelppari", //License
        "PL oppilas", //static student
        "Nova oppilas", //Aff student
        "Lentäjä", //Pilot
        "Muu" //Other
    ];

    static staticLeveles: string[] = [
        "PL-hyppy",
        "PL-hyppy",
        "PL-hyppy",
        "PL-HV-hyppy",
        "PL-HV-hyppy",
        "PL-HV-hyppy",
        "IA 3s", "IA 5s",
        "IA 10s",
        "HD totuttelu 15s",
        "Suora UH",
        "Sukellus UH",
        "360 käännökset",
        "Selkälento",
        "Tynnyri takavoltti",
        "Liuku",
        "FS-liuku",
        "Kuvunkäsittely",
        "Kuvunkäsittely",
        "Kuvunkäsittely",
        "Ryhmähyppy",
        "Ryhmähyppy",
        "Ryhmähyppy",
        "Ryhmähyppy",
        "Ryhmähyppy",
        "Valinnainen",
        "Valinnainen",
        "Valinnainen",
        "Valinnainen",
        "Valinnainen",
        "Koehyppy"];

    static affLevels: string[] = [
        "Tasohyppy 1",
        "Tasohyppy 2",
        "Tasohyppy 3",
        "Tasohyppy 4",
        "Tasohyppy 5",
        "Tasohyppy 6",
        "Tasohyppy 7",
        "Tasohyppy 8",
        "8s",
        "5s",
        "5s",
        "Selkälento",
        "Liuku",
        "FS-Liuku",
        "Kuvunkäsittely",
        "Kuvunkäsittely",
        "Kuvunkäsittely",
        "Ryhmähyppy",
        "Ryhmähyppy",
        "Ryhmähyppy",
        "Ryhmähyppy",
        "Ryhmähyppy",
        "Valinnainen",
        "Valinnainen",
        "Koehyppy",
    ];

    static JumperDetails: string[] = [
        "PL HM", //Static instr.
        "TDM HM",//Tandem instr.
        "Nova HM", //Aff instr.
        "VPK", //Coach
        "Kuvaaja",//Videoperson
        "Radio"//Radio for students
    ];
}

export default VariableData