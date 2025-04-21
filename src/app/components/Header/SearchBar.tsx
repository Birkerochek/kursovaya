import Link from "next/link";
import { FindService, NoResults, SearchResultItem, SearchResults } from "./HeaderStyles";
import useServiceSearch from "./hooks/useServiceSearch";


export default function SearchBar(){
    const {searchQuery, setSearchQuery, searchResults} = useServiceSearch()

    return(
        <div style={{ position: "relative", flex: 1 }}>
        <FindService
          placeholder="Найти услугу"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Поиск услуг"
        />
        {searchResults.length > 0 ? (
          <SearchResults>
            {searchResults.map((service) => (
              <Link
                href={`/pages/catalog/${service.id}`}
                key={service.id}
                style={{ textDecoration: "none" }}
              >
                <SearchResultItem>{service.title}</SearchResultItem>
              </Link>
            ))}
          </SearchResults>
        ) : searchQuery && searchQuery.trim() !== "" ? (
          <SearchResults>
            <NoResults>Ничего не найдено</NoResults>
          </SearchResults>
        ) : null}
      </div>

    )
}