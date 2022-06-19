const HorizontalLine = (props: {className?: string}) => {
  const { className } = props;
  return (
    <div className={`w-full ${className? className : ''}`} style={{ height: '1px', backgroundColor: 'rgb(219, 219, 219)' }}></div>
  )
}

export default HorizontalLine;