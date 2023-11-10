import { useEffect, useState } from "react";
import { getSuggestions } from "plugins/axios";
const SuggestComponent = ({ handler, value, placeholder, prepend, className, suggestWidth, city, keyName = 'suggest', ...rest }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isHandwritingAllowed, setIsHandwritingAllowed] = useState(false);
  const [searchValue, setSearchValue] = useState(value);

  async function suggestAddress() {
    if (searchValue.length > 0) {
      let searchText = "Беларусь, "
      if (city !== undefined && city !== null && city != 'online' && city != 'all') {
        searchText = searchText + `${city}, `
      }
      searchText = searchText + searchValue
      let results = await getSuggestions(searchText)
      if (results.status !== 200 || !("results" in results.data) || results.data.results.length === 0) {
        setSuggestions([])
        setIsHandwritingAllowed(true)
      }
      else {
        setSuggestions(results.data.results)
        setIsHandwritingAllowed(false)
      }
    }
  }

  function saveAddress(e) {
    if (isHandwritingAllowed || suggestions.find(elem => elem.subtitle.text + ', ' + elem.title.text === e.target.value) !== undefined) {
      handler(e.target.value)
    }
  }

  const suggestionsApplySelect = suggestions.map((suggestion, index) => {
    return <option key={index} value={suggestion.subtitle.text + ', ' + suggestion.title.text}>{suggestion.subtitle.text + ', ' + suggestion.title.text}</option>;
  });

  useEffect(() => {
    const timeOutId = setTimeout(async () => await suggestAddress(), 1000);
    return () => clearTimeout(timeOutId);
  }, [searchValue]);

  return (
    <div className={className}>
      <input
        type={"text"}
        maxLength={200}
        width={suggestWidth}
        id={keyName}
        key={keyName}
        list={"suggestionList"}
        defaultValue={value}
        placeholder={placeholder}
        style={{ ...rest }}
        onKeyDown={e => setSearchValue(e.target.value)}
        onChange={saveAddress}
      ></input>
      <datalist id="suggestionList">
        {suggestionsApplySelect}
      </datalist>
      {prepend}
    </div>
  );
};

export { SuggestComponent };