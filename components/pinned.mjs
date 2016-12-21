import m from 'mithril'

export default {
  oninit( { attrs : { originX, originY } } ){
    Object.assign( this, { originX, originY } )
  },

  oncreate( { dom, attrs } ){
    const box = vnode.dom.getBoundingClientRect()

    if( box.width < window.innerWidth ){
      const margin = box.right - window.innerWidth

      if( margin < 0 )
        this.originX = attrs.originX - margin
    }
    else
      this.originX = 0

    if( box.height < window.innerHeight ){
      const margin = box.bottom - window.innerHeight

      if( margin < 0 )
        this.originY = attrs.originY - margin
    }
    else
      this.originY = 0

    this.rendered = true

    window.requestAnimationFrame( m.redraw )
  },

  view : ( { state, children, attrs : { originX, originY, ...attrs } } ) =>
    m( 'div', {
      ...attrs,

      style : {
        left       : state.originX + 'px',
        top        : state.originY + 'px',
        maxWidth   : window.innerWidth  + 'px',
        maxHeight  : window.innerHeight + 'px',
        overflow   : 'auto',
        visibility : state.rendered ? 'visible' : 'hidden'
      }
    },
      ...children
    )
}
