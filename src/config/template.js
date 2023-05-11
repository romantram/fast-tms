import drivers from './drivers';
import trucks from './trucks';
import trailers from './trailers';

const template = {
    name: {
        label: "Imię i Nazwisko",
        type: "datalist",
        options: drivers.names,
        show: true,
        example: ["Driver01"],
        align: "left"
    },
    truck: {
        label: "Ciągnik",
        type: "datalist",
        options: trucks.numbers,
        show: true,
        example: ["Truck01"],
        align: "left"
    },
    trailer: {
        label: "Naczepa",
        type: "datalist",
        options: trailers.numbers,
        show: true,
        example: ["Trailer01"],
        align: "left"
    },
    loadingDate: {
        label: "Data załadunku",
        show: true,
        example: ["0.00.0000"],
        align: "left"
    },
    loadingPlace: {
        label: "Miejsce załadunku",
        show: true,
        example: ["00-000 City and Street"],
        align: "left"
    },
    unloadingPlace: {
        label: "Miejsce rozładunku",
        show: true,
        example: ["00-000 City and Street"],
        align: "left"
    },
    price: {
        label: "Cena",
        type: "number",
        show: true,
        example: [1000],
        align: "left"
    },
    comment: {
        label: "Komentarz",
        type: "textarea",
        example: ["Lorem ipsum dolor sit amet"]
    },
    isFinished: {
        label: "Czy zakończone",
        example: [false]
    }
};

export default template;
