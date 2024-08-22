

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

const edge: number = 10;//отступы справа слева для контейнера
export const edgePx: string = edge + 'px' //отступы справа слева для падинга в контейнере

const fontMain: string = "black";
const fontWhite: string = "#fff";
const fontHover: string = '#929296';
const page_bg: string = "#FBFBFB";
const gold: string = "#EFC564";
const blue: string = "#2196F3";
const darkBg: string = "#262729";


export const baseTheme = {
    minWidth: size.mobileS,
    fontFamily: "sans-serif",



    colors: {
        burgerMenu: {
            bg: page_bg,
            bg2n: darkBg,
            bg1n: darkBg,

        },
        bannerBasket: {
            sum: darkBg,
            font: gold,
            hover: fontWhite
        },
        font: {
            main: fontMain,
            menu_list_tablet: '#D9DDF0'
        },
        wrapper: {
            bg: page_bg
        },
        auth: {
            bg: gold,
            hover: page_bg
        },
        basket: {
            bg: gold,
            hover: page_bg
        },
        menu_list: {
            font: gold,
            bg: '#292D40',
            li: '#2D3560',
            li2n: '#080F33',
        },
        footer: {
            bg: darkBg,
        },
        header: {
            bg: darkBg,
        },
        logo: {
            bg: page_bg
        },
        formAuth: {
            font: fontWhite,
            placeholder: "grey",
            icon: {
                bg: fontMain,
                icon: "#292D40"
            },
            body: {
                bg: darkBg
            },
            button: {
                bg: "#009999"
            }
        },
        formLogOut: {
            font: page_bg,
            /* body: {
                 bg: darkBg
             },*/
            button: {
                bg: darkBg,
                font: gold
            }
        },
        miniModal: {
            body: {
                bg: fontHover
            },
        },
        myModal: {
            cover: "rgba(0, 0, 0, 0.92)",
            body_bg: fontHover
        },
        table: {
            bg: darkBg,
            font: page_bg,
            line: page_bg,
            font_th: fontMain,
        },
        adminPanel: {
            button: {
                font: gold,
                font_hover: fontHover,
                bg: darkBg,
            }
        },
        adminForm: {
            title: fontMain,

            body: {
                bg: darkBg
            },
            button: {
                font: "#fff",
                bg: "#009999"
            }

        },
        myFormButton: {
            color: gold,
            bg: darkBg,

        },
        productSelectInput: {
            button: {
                text: gold,
                bg: darkBg,
            }
        },
        selectBar: {
            button: {
                text: "inherit",
                text_active: page_bg,
                bg: "transparent",
                color_hover: fontHover,
                bg_active: darkBg,
                color_hover_active: page_bg
            }
        },
        myIcon: {
            bg: "transparent",
            bg_active: darkBg,
            line_active: gold,
            line: fontMain,
            line_hover: fontHover,
        },
        pages: {
            font_active: page_bg,
            font_hover: fontHover
        },
        checkBox: {
            bg: page_bg,
            bg_hover: fontHover,
            bg_checked: gold,
            bg_checked_blue: blue,
            mark: "transparent"
        },
        selectLimit: {
            placeholder: {
                bg: darkBg,
                font: page_bg,
                arrow: page_bg,
                focus: gold
            },
            list: {
                bg: page_bg,
                border: darkBg
            },
            option: {
                active_bg: gold,
                hover: fontHover
            }
        }

    },

    sizes: {
        container: {maxWidth: 1600 + edge + edge},


        //header: { height: 56 },
        //footer: { height: 128 },
        //modal: { width: 540 },
    },


    width: {
        mobileS: 320,
        mobileM: 375,
        mobileL: 425,
        tablet: 768,
        laptop: 1024,
        laptopL: 1440,
        desktop: 2560
    },

    maxMedia: {
        mobile320: `(max-width: ${size.mobileS})`,
        mobile375: `(max-width: ${size.mobileM})`,
        mobile425: `(max-width: ${size.mobileL})`,
        tablet768: `(max-width: ${size.tablet})`,
        laptop1024: `(max-width: ${size.laptop})`,
        laptop1440: `(max-width: ${size.laptopL})`,
        desktop2560: `(max-width: ${size.desktop})`,

    },

    minMedia: {
        mobile320: `(min-width: ${size.mobileS})`,
        mobile375: `(min-width: ${size.mobileM})`,
        mobile425: `(min-width: ${size.mobileL})`,
        tablet768: `(min-width: ${'768.01px'})`,
        laptop1024: `(min-width: ${size.laptop})`,
        laptop1440: `(min-width: ${size.laptopL})`,
        desktop2560: `(min-width: ${size.desktop})`,
    },

    /* colors: {
         primary: '#7986cb',
         secondary: '#2b2b2b',
         success: '#4caf50',
         danger: '#f44336 ',

         bg: '#E5E4E8',
         font: '#19191B',
     },

     // in px
     dataSizes: {
         header: { height: 56 },
         container: { width: 1200 },
         footer: { height: 128 },
         modal: { width: 540 },
     },

     // in ms
     durations: {
         ms300: 300,
     },

     // z-index
     order: {
         header: 50,
         modal: 100,
     },*/
}