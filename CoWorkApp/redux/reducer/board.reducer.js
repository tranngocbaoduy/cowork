


import { boardConstants } from '../constant/board.constant'; 
 
const friend = [
    {
        id:"01",
        name:'Alaska',
        email:'alaska@example.com'
    },
    {
        id:"02",
        name:'Hikari',
        email:'hikari@example.com'
    },
    {
        id:"03",
        name:'Valdimir',
        email:'vald@example.com'
    },
    {
        id:"04",
        name:'Axe',
        email:'axe@example.com'
    }

];

const initalState = {  
    data:[ 
    {
        id:'01',name: 'Fake Study', image:require('../../assets/board/topic_1.png'),  date: '21/03/2020, 9:30', memberCount: 2,
        category:[
            {
                id:'01',
                name:'Speaking',
                tags:['pink','orange'],
                image: require('../../assets/category/speaking.png'),
                task:[
                    {
                        id:'01',
                        name:'Lecture 01: Hello !!! How are you ?',
                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
                        dateStart: '21/03/2020',
                        dateEnd: '22/03/2020',
                    },
                    {
                        id:'02',
                        name:'Lecture 02: What do you do?',
                        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", 
                        dateStart: '21/03/2020',
                        dateEnd: '22/03/2020',
                    }
                ]
            },
            {
                id:'02',
                name:'Writing',
                tags:['red','blue'],
                image: require('../../assets/category/writing.png'),
                task:[
                    {
                        id:'01',
                        name:'Lecture 01: Hello !!! How are you ?',
                        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
                        dateStart: '21/03/2020',
                        dateEnd: '22/03/2020',
                    },
                    {
                        id:'02',
                        name:'Lecture 02: What do you do?',
                        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.", 
                        dateStart: '21/03/2020',
                        dateEnd: '22/03/2020',
                    }
                ]
            }
        ]
    },
    {id:'02',name: 'Japan Study', image:require('../../assets/board/topic_2.png'), date: '21/03/2020, 9:30', memberCount: 3},
    {id:'03',name: 'Computer Vision', image:require('../../assets/board/vision.png'), date: '21/03/2020, 9:30', memberCount: 15},
    {id:'04',name: 'Drawing Study', image:require('../../assets/board/draw_2.png'), date: '21/03/2020, 9:30', memberCount: 7},
    {id:'05',name: 'Neural Network', image:require('../../assets/board/neural.png'), date: '21/03/2020, 9:30', memberCount: 8}, 
    {id:'07',name: 'Drawing', image:require('../../assets/board/draw.png'), date: '21/03/2020, 9:30', memberCount: 12},
    {id:'08',name: 'Japan Study', image:require('../../assets/board/japan.png'), date: '21/03/2020, 9:30', memberCount: 31}, 
    {id:'10',name: 'English Study', image:require('../../assets/board/english.png'), date: '21/03/2020, 9:30', memberCount: 5},
]}

export function boardReducer(state = initalState, action) {  
    switch (action.type) {
        case boardConstants.GET_BOARD_REQUEST: 
            return {  
                loading: true,
            }  
        case boardConstants.GET_BOARD_SUCCESS: 
            return {
                ...state, 
                friend:friend,
                data: initalState.data,
                board: action.data,
                loading: false
            }   
        case boardConstants.GET_BOARD_FAILED: 
            return {
                error: action.error,
                failed: true,
            }    

        case boardConstants.CREATE_BOARD_REQUEST: 
            return {  
                ...state,
                loading: true,
            }  
        case boardConstants.CREATE_BOARD_SUCCESS: 
            return { 
                ...state,
                board: null, 
            }   
        case boardConstants.CREATE_BOARD_FAILED: 
            return {
                error: action.error,
                failed: true,
            }        
        default:
            return state;
    }
}