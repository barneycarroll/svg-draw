import m from 'mithril'

const flatten   = array =>
  array.reduce( ( a, b ) => a.concat( b ), [] )

const HoverNode = {
  hovered  : false,
  selector : 'div',

  view( { attrs : { hover, ...attrs }, state, children } ){
    if( hover ){
      const [ on, off ] = hover

      state.selector = state.hovered ? on : off
    }

    return (
      m( selector, {
        onmouseover(){
          state.hovered = true
        },

        onmouseout(){
          state.hovered = false
        },

        ...attrs
      },
        ...children
      )
    )
  }
}

export default {
  rendered : false,

  oninit( { attrs : { cancel = () => {} } } ){
    this.click    = e =>
      cancel()

    this.keypress = e => {
      if( e.key === 'Esc' )
        cancel()
    }

    document.addEventListener( 'keypress', this.keypress )
    document.addEventListener( 'click',    this.click    )
  },

  onremove( vnode ){
    document.removeEventListener( 'keypress', this.keypress )
    document.removeEventListener( 'click',    this.click    )
  },


  view : vnode =>
    m( '.fixed.bg-light-gray.ba',
      onclick( e ){
        e.stopPropagation()
      }
    },
      vnode.attrs.options.map( function option( [ text, callback, ...contents ] ){
        if( typeof callback !== 'function' ){
          contents.unshift( callback )
          callback = () => {}
        }

        return (
          m( HoverNode, {
            hover : [
              '.moon-gray.bg-dark-blue',
              '.black.bg-light-gray'
            ],

            onclick : callback
          },
            text,
            contents.map( option )
          )
        )
      }
    )
  )
}
