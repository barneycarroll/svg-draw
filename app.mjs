import m      from 'mithril'
import Pinned from './components/pinned'
import Menu   from './components/menu'

const fill = '.fixed.w100.h100'

m.mount( document.body, {
  canvas    : [],
  zoom      : 1,
  offset    : { x : 0, y : 0 },
  selection : [],
  grid      : [],
  context   : false,
  lastClick : undefined,

  onclick( e ){
    this.context   = !this.context

    if( this.context ){
      this.lastClick = e
    }
  },

  view   : vnode =>
    m( '#app' + fill,
      m( '#grid' + fill ),

      m( '#canvas' + fill,
        canvas
      ),

      m( '#interface' + fill, {
        onclick : e =>
          vnode.state.onclick( e )
      },
        (
          state.context
        ? m( Pinned, {
            originX : state.lastClick.screenX,
            originY : state.lastClick.screenY,
            cancel  : () =>
              state.context = false
          },
            m( Menu, {
              options : [
                'New element',
                [
                  [ m( 'code.b', 'svg',    make( 'svg' )    ],
                  [ m( 'code.b', 'g',      make( 'g' )      ],
                  [ m( 'hr' ) ],
                  [ m( 'code.b', 'path',   make( 'path' )   ],
                  [ m( 'hr' ) ],
                  [ m( 'code.b', 'line',   make( 'line' ) ],
                  [ m( 'code.b', 'rect',   make( 'rect' ) ],
                  [ m( 'code.b', 'circle', make( 'circle' ) ]
                ]
              ]
            } )
          )
        )
      )
    )
} )
