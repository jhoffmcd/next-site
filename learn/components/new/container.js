export default ({ center, dark, gray, wide, padding, overflow, children, ...props }) => {
  return (
    <div {...props}>
      <style jsx>{`
      {
        width: 100%;
        margin: 0 auto;
        padding: ${padding ? '4rem' : '0'} ${wide ? '0' : '1rem'};
        ${wide ? '' : `max-width: 1024px;`}
        ${center ? `text-align: center;` : ''}
        ${dark ? `background-image: linear-gradient(to bottom, #121212 0%, #323232 100%);` : ''}
        ${dark ? `color: white;` : ''}
        ${gray ? `background-color: #f6f6f6;` : ''}
        ${wide && !overflow ? 'overflow: hidden;' : ''}
      }
      :after {
        // BFC
        content: '';
        display: table;
        clear: both;
      }
    `}</style>
      {children}
    </div>
  )
}
