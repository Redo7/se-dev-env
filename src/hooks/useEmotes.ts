import type { Emote, EmoteImage, SevenTVEmote } from "@/types/emotes";
import { useQuery } from "@tanstack/react-query";

const response = {
    "data": {
        "emotes": {
            "search": {
                "items": [
                    {
                        "id": "01F6MZGCNG000255K4X1K7NTHR",
                        "defaultName": "GIGACHAD",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MZGCNG000255K4X1K7NTHR/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6MKTFTG0009C9ZSNZTFV2ZF",
                        "defaultName": "NOOOO",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MKTFTG0009C9ZSNZTFV2ZF/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6MQ33FG000FFJ97ZB8MWV52",
                        "defaultName": "catJAM",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MQ33FG000FFJ97ZB8MWV52/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6N31ETR0004P7N4A9PKS5X9",
                        "defaultName": "BOOBA",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6N31ETR0004P7N4A9PKS5X9/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6ME7ADR0000WDA7ERT9H30R",
                        "defaultName": "COPIUM",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ME7ADR0000WDA7ERT9H30R/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NACCD80006SZ7ZW5FMWKWK",
                        "defaultName": "Prayge",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NACCD80006SZ7ZW5FMWKWK/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F00Z3A9G0007E4VV006YKSK9",
                        "defaultName": "OMEGALUL",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F00Z3A9G0007E4VV006YKSK9/2x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F5VW2TKR0003RCV2Z6JBHCST",
                        "defaultName": "catKISS",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F5VW2TKR0003RCV2Z6JBHCST/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6MXJD8R000F76KNAAV5HDGD",
                        "defaultName": "Bedge",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MXJD8R000F76KNAAV5HDGD/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6MDFCSR0000WDA7ERT623YT",
                        "defaultName": "NODDERS",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MDFCSR0000WDA7ERT623YT/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01EZPG1FN80001SNAW00ADK2DY",
                        "defaultName": "Sadge",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZPG1FN80001SNAW00ADK2DY/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FCX95ZG80009QXBMY7YYTVBJ",
                        "defaultName": "DIESOFCRINGE",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FCX95ZG80009QXBMY7YYTVBJ/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6FTE8B80008E39HFFQJ7MWS",
                        "defaultName": "modCheck",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6FTE8B80008E39HFFQJ7MWS/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6BN89H80006VBW12DRB1DJ0",
                        "defaultName": "donowall",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6BN89H80006VBW12DRB1DJ0/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FFWH9WV80000JT8GHDKHJNZC",
                        "defaultName": "Aware",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NMMEER00015NVG2J8ZH77N",
                        "defaultName": "peepoHey",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMMEER00015NVG2J8ZH77N/1x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6T8NM9R0007M5BTFWSP1YSJ",
                        "defaultName": "Clueless",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6T8NM9R0007M5BTFWSP1YSJ/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F8G9MDAR0009YQPYZYCKHYKQ",
                        "defaultName": "SUSSY",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F8G9MDAR0009YQPYZYCKHYKQ/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FF3R5C30000FF5VVCKV49G6J",
                        "defaultName": "xdd",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FF3R5C30000FF5VVCKV49G6J/2x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F61B1440000991F7SWQNMVX7",
                        "defaultName": "KEKW",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F61B1440000991F7SWQNMVX7/2x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F7M225F8000AWSXNQ65M4PKG",
                        "defaultName": "SNIFFA",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F7M225F8000AWSXNQ65M4PKG/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6MA6Y100002B6P5MWZ5D916",
                        "defaultName": "Hmm",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MA6Y100002B6P5MWZ5D916/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6RD7B88000B4N55W5NS55R7",
                        "defaultName": "LETSGO",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6RD7B88000B4N55W5NS55R7/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F63B8GJR000AE7CZT484KXF9",
                        "defaultName": "muted",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F63B8GJR000AE7CZT484KXF9/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01GDDQVMH000038Q48APH8VE3Q",
                        "defaultName": "AINTNOWAY",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GDDQVMH000038Q48APH8VE3Q/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6QV6G8R0000TEKRM6BFG0Z3",
                        "defaultName": "ratJAM",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6QV6G8R0000TEKRM6BFG0Z3/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NET6G00009JYTB75QDKV1S",
                        "defaultName": "peepoClap",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NET6G00009JYTB75QDKV1S/3x_static.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FBS4X63R000AAZQB4F0E7SEB",
                        "defaultName": "peepoDJ",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FBS4X63R000AAZQB4F0E7SEB/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NTA4X80007X1R6PNS21T6E",
                        "defaultName": "peepoGiggles",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTA4X80007X1R6PNS21T6E/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01G4ZGET1R0003SYTMXJ2SQCGP",
                        "defaultName": "peepoLeave",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZGET1R0003SYTMXJ2SQCGP/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01GBFAYKGR000FWWN7MDZZ8XQN",
                        "defaultName": "RAGEY",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBFAYKGR000FWWN7MDZZ8XQN/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01EZY967K0000CYST6006V20T8",
                        "defaultName": "pepeJAM",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY967K0000CYST6006V20T8/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6PPENA80002RDNAW6F35V4X",
                        "defaultName": "YEP",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6PPENA80002RDNAW6F35V4X/1x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01EZTCN91800012PTN006Q50PR",
                        "defaultName": "Pog",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTCN91800012PTN006Q50PR/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6ASPNM00009TPCEMWQTT4XX",
                        "defaultName": "Madge",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6ASPNM00009TPCEMWQTT4XX/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01GK4EW2AG0004SH49XX2J74KJ",
                        "defaultName": "peepoShy",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GK4EW2AG0004SH49XX2J74KJ/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6Q92RGG000A6S4F82D85T0B",
                        "defaultName": "peepoArrive",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q92RGG000A6S4F82D85T0B/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NF001G00044EM07K5E6WYK",
                        "defaultName": "PETTHEMODS",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NF001G00044EM07K5E6WYK/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01GBPSCGR00007Q17796BDN5AJ",
                        "defaultName": "classic",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GBPSCGR00007Q17796BDN5AJ/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NPHCN0000BEKN8ZXWQNSDC",
                        "defaultName": "monkaW",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPHCN0000BEKN8ZXWQNSDC/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NM2T080003C6R1CKK0T0P2",
                        "defaultName": "WICKED",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NM2T080003C6R1CKK0T0P2/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FKKW7C1G0008TM5NY9QEFEDW",
                        "defaultName": "HUH",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FKKW7C1G0008TM5NY9QEFEDW/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01G4ZTECKR0002P97QQ94BDSP4",
                        "defaultName": "WHAT",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G4ZTECKR0002P97QQ94BDSP4/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FS5ZCFG0000500DPPCXJWCP8",
                        "defaultName": "o7",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FS5ZCFG0000500DPPCXJWCP8/4x.png"
                            }
                        ]
                    },
                    {
                        "id": "01F6Q76NN80005589X3BDK9CN1",
                        "defaultName": "PepeLaugh",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q76NN80005589X3BDK9CN1/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6Q09DJR00015Y8FNQBDEPQK",
                        "defaultName": "peepoBye",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6Q09DJR00015Y8FNQBDEPQK/4x_static.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6MMZW3R00012ZP6HJJ38G2E",
                        "defaultName": "SadgeCry",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6MMZW3R00012ZP6HJJ38G2E/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6S7PENR0008HT14D95H43BY",
                        "defaultName": "Susge",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6S7PENR0008HT14D95H43BY/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F9Q9PA100009VDTF4G64R32V",
                        "defaultName": "Nerdge",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F9Q9PA100009VDTF4G64R32V/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01H0405680000AJFXTYVX2PNJ7",
                        "defaultName": "uuh",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01H0405680000AJFXTYVX2PNJ7/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FYQZVG280006SX8JX4TD7SJA",
                        "defaultName": "VIBE",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FYQZVG280006SX8JX4TD7SJA/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01GQ3WPTDR000300KQF1J7PFF8",
                        "defaultName": "NOWAYING",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GQ3WPTDR000300KQF1J7PFF8/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NE9AER000CKKT9BSDYGT0J",
                        "defaultName": "Clap",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NE9AER000CKKT9BSDYGT0J/2x_static.avif"
                            }
                        ]
                    },
                    {
                        "id": "01G1M77D4R0004YN3NKDRR9YKJ",
                        "defaultName": "ok",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1M77D4R0004YN3NKDRR9YKJ/2x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NPFQXG000AAS5FM9Q6GVCC",
                        "defaultName": "5Head",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NPFQXG000AAS5FM9Q6GVCC/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NMEF1R000AAS5FM9QEG8S3",
                        "defaultName": "monkaSTEER",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NMEF1R000AAS5FM9QEG8S3/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FWR6BNTR0007SGPMW6AKG0Q9",
                        "defaultName": "Listening",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FWR6BNTR0007SGPMW6AKG0Q9/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FA0PBXM8000AD7Y8T9ZMTFZ5",
                        "defaultName": "ICANT",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FA0PBXM8000AD7Y8T9ZMTFZ5/4x.png"
                            }
                        ]
                    },
                    {
                        "id": "01FFMS6Q4G0009CAK0J14692AY",
                        "defaultName": "HUH",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FFMS6Q4G0009CAK0J14692AY/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01GN5QQ1X8000C0QTR0C8JV0GR",
                        "defaultName": "LETHIMCOOK",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GN5QQ1X8000C0QTR0C8JV0GR/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01EZY51MDR000CYST6006V20T4",
                        "defaultName": "NOPERS",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZY51MDR000CYST6006V20T4/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01G1GXCR380004YN3NKDRR9QHD",
                        "defaultName": "wideVIBE",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01G1GXCR380004YN3NKDRR9QHD/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NTBCYG000B70V1XA8K6W4P",
                        "defaultName": "peepoRiot",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NTBCYG000B70V1XA8K6W4P/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01EZTD6KQ800012PTN006Q50PV",
                        "defaultName": "Pepega",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01EZTD6KQ800012PTN006Q50PV/1x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6WP22CR0004YCK11WAVZHEW",
                        "defaultName": "HACKERMANS",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6WP22CR0004YCK11WAVZHEW/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FAK9C8MR0004HKF2ZK1YPQ5A",
                        "defaultName": "Chatting",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FAK9C8MR0004HKF2ZK1YPQ5A/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01GA4TYKW0000EN50T4AGZ0CK8",
                        "defaultName": "lebronJAM",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01GA4TYKW0000EN50T4AGZ0CK8/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6P0803G000898NRWSAKGYXT",
                        "defaultName": "POGGERS",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/1x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/3x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/2x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/4x.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/4x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6P0803G000898NRWSAKGYXT/3x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F2ZWD6CR000DSBG200DM9SGM",
                        "defaultName": "pepeD",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F2ZWD6CR000DSBG200DM9SGM/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F779KZC8000D25DGAC8PTX5Q",
                        "defaultName": "PeepoFinger",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F779KZC8000D25DGAC8PTX5Q/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01F6NCKMP000052X5637DW2XDY",
                        "defaultName": "meow",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01F6NCKMP000052X5637DW2XDY/4x.avif"
                            }
                        ]
                    },
                    {
                        "id": "01FEV00990000FCZBKX8KY8JRF",
                        "defaultName": "Nerd",
                        "images": [
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/1x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/1x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/1x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/2x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/1x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/2x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/2x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/1x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/3x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/1x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/2x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/3x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/3x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/2x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/4x_static.png"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/4x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/4x.gif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/3x_static.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/2x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/3x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/4x_static.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/4x.webp"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/3x.avif"
                            },
                            {
                                "url": "https://cdn.7tv.app/emote/01FEV00990000FCZBKX8KY8JRF/4x.avif"
                            }
                        ]
                    }
                ],
                "totalCount": 1303751
            }
        }
    },
    "extensions": {
        "analyzer": {
            "complexity": 8,
            "depth": 5
        }
    }
}

const useEmotes = () => {
	const fetchEmotes = async () => {
		// const response = await fetch("https://7tv.io/v4/gql", {
		//   method: "POST",
		//   headers: { "Content-Type": "application/json" },
		//   body: JSON.stringify({
		// 	operationName: "EmoteSearch",
		// 	query: `query EmoteSearch($query: String, $tags: [String!]!, $sortBy: SortBy!, $filters: Filters, $page: Int, $perPage: Int!) {
		// 	  emotes {
		// 		search(query: $query, tags: {tags: $tags, match: ANY}, sort: {sortBy: $sortBy, order: DESCENDING}, filters: $filters, page: $page, perPage: $perPage) {
		// 		items { id defaultName images { url } }
		// 		totalCount
		// 		}
		// 	  }
		// 		}`,
		// 	variables: {
		// 	  filters: {},
		// 	  page: 1,
		// 	  perPage: 72,
		// 	  query: null,
		// 	  sortBy: "TOP_ALL_TIME",
		// 	  tags: [],
		// 	},
		//   }),
		// });
	  
		// const data = await response.json();
		const emotes_1x = response.data.emotes.search.items.map((emote: Emote) => ({
			...emote,
			images: [
				{url: emote.images.find((img: EmoteImage) => img.url.endsWith("1x.avif"))?.url}
			]
		}));
		return {emotes: response.data.emotes.search.items, emotes_1x};
	};
	const { data } = useQuery({
		queryKey: ['emotes'],
		queryFn: fetchEmotes,
		staleTime: Infinity,
	  });
	  
	  return { 
		emotes: data?.emotes, 
		emotes_1x: data?.emotes_1x 
	  };
}

export function replaceEmotes(text: string, emotes: Emote[]): string {
	const emoteMap = new Map<string, Emote>();
	emotes.forEach((emote) => emoteMap.set(emote.defaultName, emote));
  
	const words = text.split(/(\s+)/);
  
	return words
	  .map((word) => {
		const trimmed = word.trim();
		if (!trimmed || !emoteMap.has(trimmed)) return word;
  
		const emote = emoteMap.get(trimmed)!;
		const getUrl = (size: string) =>
		  emote.images.find((img) => img.url.includes(`/${size}.webp`))?.url;
  
		const url1x = getUrl("1x");
		const url2x = getUrl("2x");
		const url4x = getUrl("4x");
  
		if (!url1x) return word;
  
		return `<img src=\"${url1x}\" srcset=\"${url1x} 1x, ${url2x} 2x, ${url4x} 4x\" title=\"${emote.defaultName}\" class=\"emote\" />`;
	  })
	  .join("");
  }
  
export function mapEmotes(text: string, emotes: Emote[]): SevenTVEmote[] {
	const emoteMap = new Map<string, Emote>();
	emotes.forEach((emote) => emoteMap.set(emote.defaultName, emote));

	const result: SevenTVEmote[] = [];
	let position = 0;

	const words = text.split(/(\s+)/);

	for (const word of words) {
		const trimmed = word.trim();
		const emote = emoteMap.get(trimmed);

		if (emote && trimmed) {
		const hasGif = emote.images.some((img) => img.url.endsWith(".gif"));
		const hasAnimated = emote.images.some(
			(img) => !img.url.includes("_static")
		);

		const getUrl = (size: string) =>
			emote.images.find((img) => img.url.includes(`/${size}.webp`))?.url ||
			"";

		result.push({
			type: "7tv",
			name: emote.defaultName,
			id: emote.id,
			gif: hasGif,
			animated: hasAnimated,
			urls: {
			"1": getUrl("1x"),
			"2": getUrl("2x"),
			"3": getUrl("3x"),
			"4": getUrl("4x"),
			},
			start: position,
			end: position + trimmed.length,
		});
		}

		position += word.length;
	}

	return result;
}

export default useEmotes