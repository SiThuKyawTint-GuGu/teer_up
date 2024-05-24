"use client";

import OpportunityList from "@/page-containers/school/opportunities/OpportunityList";
import { useGetCompanyOpportunity } from "@/services/companyOpportunity";
import { CompanyOpportunityResponse } from "@/types/CompanyOpportunity";
import { NextPage } from "next";

const CompanyOpportunityPage: NextPage = () => {
  const { data, isLoading } = useGetCompanyOpportunity<CompanyOpportunityResponse>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.data) {
    return <div>No opportunities available.</div>;
  }

  return <>{!isLoading && <OpportunityList data={data?.data} />}</>;
};

export default CompanyOpportunityPage;
