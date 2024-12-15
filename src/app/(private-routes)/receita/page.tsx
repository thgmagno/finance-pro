interface SearchParamsIncome {
  mes: string
  ano: string
}

export default async function Income({
  searchParams,
}: {
  searchParams: Promise<SearchParamsIncome>
}) {
  const params = await searchParams

  console.log(params)

  return <div>Income</div>
}
