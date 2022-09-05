import { useEffect, useMemo } from "react";
import { YMaps, withYMaps } from "react-yandex-maps";
import { useSelector } from "react-redux";

const SuggestComponent = ({ handler, value, placeholder, prepend, className, suggestWidth, suggestId, isCitySet = false, ...rest }) => {

  function MapSuggestComponent(props) {
    const { ymaps } = props;
    const city = useSelector((state) => state.suggestCity)

    useEffect(() => {
      ymaps.ready(() => {
        const suggestView = new ymaps.SuggestView(suggestId ?? 'suggest', {
          provider: {
            suggest: request => {
              let boundResult = 'Беларусь, '
              if (isCitySet && city != 'online' && city != 'all') {
                boundResult += city + ', '
              }
              return ymaps.suggest(boundResult + request).then(items => {
                items = items.filter(item => item.displayName.endsWith(', Беларусь'))
                items.forEach(item => {
                  if (isCitySet && city != 'online' && city != 'all') {
                    console.log(city)
                    item.value = item.value.replace('Беларусь, ' + city + ', ', '')
                  }
                  else {
                    item.value = item.value.replace('Беларусь, ', '')
                  }

                  item.displayName = item.displayName.replace(', Беларусь', '')
                })

                return items
              })
            }
          }
        });
        suggestView.events.add("select", (e) => {
          handler(e.get('item').value)
        });
      })
    }, [ymaps.SuggestView, city]);

    const keyEnterSave = (e) => {
      if (e.key == 'Enter') {
        handler(e.target.value)
      }
    }

    return <div className={className}>
      <input
        type={"text"}
        maxLength={200}
        width={suggestWidth}
        id={suggestId ?? 'suggest'}
        defaultValue={value}
        placeholder={placeholder}
        style={{ ...rest }}
        onKeyDown={keyEnterSave}
      ></input>
      {prepend}
    </div>
  }

  const SuggestField = useMemo(() => {
    return withYMaps(MapSuggestComponent, true, [
      "SuggestView",
      'suggest'
    ]);
  }, []);

  return (
    <YMaps
      enterprise
      query={{ apikey: "3b52de14-8e8c-489d-b6d0-00b02db443c2" }}>
      <SuggestField />
    </YMaps>
  );
};

export { SuggestComponent };