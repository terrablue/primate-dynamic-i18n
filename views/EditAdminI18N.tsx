type Locale = Record<string, string>;

export default function LocalesForm(props: {
  locales: Record<string, Locale>;
}) {
  return (
    <form method="post">
      {Object.entries(props.locales).map(([locale, data]) => (
        <div key={locale}>
          <h1>{locale}</h1>

          <table>
            <thead>
              <tr>
                <th>key</th>
                <th>translation</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([key, translation]) => (
                <tr key={`${locale}-${key}`}>
                  <td>
                    <input
                      name={`${locale}[${key}][key]`}
                      defaultValue={key}
                    />
                  </td>
                  <td>
                    <input
                      name={`${locale}[${key}][value]`}
                      defaultValue={translation}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <button type="submit">Save</button>
    </form>
  );
}
