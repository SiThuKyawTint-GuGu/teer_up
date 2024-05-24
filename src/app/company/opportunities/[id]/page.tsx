"use client";

import OpportunityDetail from "@/page-containers/company/opportunities/OpportunityDetail";
import { useGetCompanyOpportunityById } from "@/services/companyOpportunity";
import { CompanyOpportunityResponseById } from "@/types/CompanyOpportunity";

export default function OpportunityDetails({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetCompanyOpportunityById<CompanyOpportunityResponseById>(params.id);

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.data) {
    return <div>No opportunities available.</div>;
  }

  return (
    <>
      <OpportunityDetail data={data?.data} />
    </>
  );
}
