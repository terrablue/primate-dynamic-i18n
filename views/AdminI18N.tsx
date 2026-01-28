type Locale = Record<string, string>;

export default (props: { locales: Record<string, Locale> }) => {
  return <div>{Object.entries(props.locales).map(([locale, data]) => {
    return <>
      <h1>{locale}</h1>
      <table>
        <tr><th>key</th><th>translation</th></tr>
        {Object.entries(data).map(([key, translation]) => {
          return <tr><td>{key}</td><td>{translation}</td></tr>
        })}
      </table>
    </>;
  })}</div >
}
