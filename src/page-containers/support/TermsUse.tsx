"use client";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid, Heading, Section } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useTransition } from "react";

const TermsUse: React.FC = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const currentOrigin = useMemo(() => {
    return typeof window !== "undefined" ? window.location.origin : null;
  }, []);

  return (
    <Grid columns="1">
      <Box>
        <div className="mb-[45px]">
          <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
            <Flex justify="between" align="center" className="bg-white" p="3">
              <Button onClick={() => startTransition(() => router.back())} variant="ghost" className="p-0 h-auto">
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </Button>

              <Text size="3" weight="medium">
                Terms of Use
              </Text>
              <Link href="/" className="opacity-0">
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
          </div>
        </div>
      </Box>
      <Box>
        <Section py="4" px="3">
          <Heading mb="6">Terms of Use</Heading>
          <Box className="space-y-10">
            <Box className="space-y-4">
              <Heading as="h5" size="4">
                Welcome to TEE-Up!
              </Heading>
              <Text size="1">
                These terms and conditions outline the rules and regulations for the use of TEE-Up&#39;s Website,
                located at{" "}
                <Link href={currentOrigin || ""} target="_blank">
                  <Text as="span" className="text-primary">
                    www.tee-up.world
                  </Text>
                </Link>
              </Text>
              <Text size="1">
                Access to this website and its pages, and the products, information, services, data, graphics, links or
                other material or items described or contained herein (“Website”) is granted by Prudential Assurance
                Company Singapore (Pte) Limited (“Prudential”) subject to the following Terms and Conditions. Use of
                this Website constitutes your agreement to be bound by all such Terms and Conditions without limitation
                or qualification. Prudential may at any time revise these Terms and Conditions by updating this posting.
                You are bound by any such revisions and should therefore periodically visit this page to review the then
                current Terms and Conditions to which you are bound. Do not continue to use or access the Website and/or
                TEE-Up if you do not agree to these Terms and Conditions stated.
              </Text>
              <Text size="1">
                The following terminology applies to these Terms and Conditions and Privacy Statement. Any and all
                Agreements related to TEE-Up: &#34;Client&#34;, &#34;You&#34; and &#34;Your&#34; refers to you, the
                person who is logging on to this website and compliant to the Company&#39;s terms and conditions.
                &#34;The Company&#34;, &#34;Ourselves&#34;, &#34;We&#34;, &#34;Our&#34; and &#34;Us&#34;, refers to
                Prudential. &#34;Party&#34;, &#34;Parties&#34;, or &#34;Us&#34;, refers to both yourself and Prudential.
                Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or
                they, are taken as interchangeable and therefore as referring to same.
              </Text>
            </Box>

            <Box className="space-y-4">
              <Heading as="h5" size="4">
                Disclaimer
              </Heading>
              <Text size="1">
                The Website and its contents are provided on a “as is” and “as available” basis. Prudential disclaims
                all warranties, express or implied, as to any matter whatsoever in relation to this Website and its
                contents, including but not limited to, all warranties of merchantability, fitness for a particular
                purpose or use, title and non-infringement of third party rights.
              </Text>
              <Text size="1">
                Prudential does not warrant the accuracy, adequacy or completeness of this Website and its contents and
                expressly disclaims liability for any errors or omissions. In addition, Prudential may, from time to
                time, at its absolute discretion, change, amend, delete or replace the Website and its contents or any
                part thereof.
              </Text>
              <Text size="1">
                No warranty is given that access to this Website will be uninterrupted or free from errors or that any
                identified defect will be corrected. Further, no warranty is given that this Website is free from any
                viruses or other malicious, destructive or corrupting code, agent, program or macros or that viruses or
                other harmful components will not be transmitted in connection with or arising from the use of this
                Website.
              </Text>
              <Text size="1">
                This Website may be linked to other websites which are not maintained by Prudential. Such links are
                provided for your convenience and reference only and the inclusion of any hyperlink to any other website
                is not an endorsement or verification by Prudential of such website, its contents or its sponsoring
                organization, and such website shall be accessed at your own risk.
              </Text>
            </Box>

            <Box className="space-y-4">
              <Heading as="h5" size="4">
                Exclusion of Liability
              </Heading>
              <Text size="1">
                Prudential shall in no event or circumstances be liable for any damages of any character or any claim,
                demand, losses or expenses including without limitation, direct, indirect, special, consequential or
                punitive damages or economic loss arising from or in connection with the use of this Website and its
                contents, including without limitation:
              </Text>
              <Text size="1">
                <ul className="pl-5 list-disc">
                  <li>
                    Any access, use or the inability to access or use this Website, or reliance on the contents of this
                    Website;
                  </li>
                  <li>
                    Any system, server or connection failure, error, omission, interruption, delay in transmission or
                    computer virus;
                  </li>
                  <li>Any use of or access to any other website linked to this Website; and/or</li>
                  <li>
                    Any services, products, information, data, software or other material obtained from this Website or
                    from any other website linked to this Website,
                  </li>
                </ul>
              </Text>
              <Text size="1">
                Howsoever caused, including negligence, even if Prudential or its employees or authorized
                representatives have been advised of the possibility of such damages, losses and/or expenses. This
                exclusion clause shall take effect to the fullest extent permitted by applicable law.
              </Text>
            </Box>

            <Box className="space-y-4">
              <Heading as="h5" size="4">
                Governing Law & Jurisdiction
              </Heading>
              <Text size="1">
                By accessing this Website and/or using the services offered through this Website, you agree that the
                laws of Singapore shall govern such access to and/or use of this Website and the provision of such
                services, and you agree to submit irrevocably to the exclusive jurisdiction of the courts of Singapore.
              </Text>
            </Box>

            <Box className="space-y-4">
              <Heading as="h5" size="4">
                Cookies
              </Heading>
              <Text size="1">
                We employ the use of cookies. By accessing TEE-Up, you agree to use cookies in accordance with the
                TEE-Up&#39;s Privacy Policy.
              </Text>
              <Text size="1">
                Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are
                used by our website to enable the functionality of certain areas to make it easier for people visiting
                our website. Some of our affiliates and/or advertising partners may also use cookies.
              </Text>
            </Box>

            <Box className="space-y-4">
              <Heading as="h5" size="4">
                License
              </Heading>
              <Text size="1">
                Unless otherwise stated, Prudential and/or its licensors own the intellectual property rights for all
                material on TEE-Up. All intellectual property rights are reserved. You may access from the Website for
                your own personal use subjected to restrictions set forth in these Terms and Conditions.
              </Text>
              <Text size="1">
                You must not:
                <ul className="pl-2">
                  <li>Republish material from TEE-Up</li>
                  <li>Sell, rent or sub-license material from TEE-Up</li>
                  <li>Reproduce, duplicate or copy material from TEE-Up</li>
                  <li>Redistribute content from TEE-Up</li>
                </ul>
              </Text>
              <Text size="1">This Agreement shall begin on the date hereof.</Text>
              <Text size="1">
                Parts of this website offer an opportunity for users to post and exchange opinions and information
                (“Comments”) in certain areas of the website. Prudential does not filter, edit, publish or review
                Comments prior to their presence on the website. Comments do not reflect the views and opinions of
                Prudential, its employees, agents and/or affiliates. Comments reflect the views and opinions of the
                person who post their views and opinions. To the extent permitted by applicable laws, Prudential shall
                not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a
                result of any use of and/or posting of and/or appearance of the Comments on this website.
              </Text>
            </Box>

            <Box className="space-y-4">
              <Heading as="h5" size="4">
                Copyright and Trademarks
              </Heading>
              <Text size="1">
                You should assume that everything you see or read on this Website is under the copyright of Prudential
                and may not be copied, used or distributed in any way without the written permission by Prudential.
                Prudential neither warrants nor represents that your use of the contents of this Website will not
                infringe any rights of third parties not owned by or affiliated with Prudential.
              </Text>
              <Text size="1">
                All trademarks, service marks, trade names, logos and icons (collectively, “Trademarks”) displayed on
                this Website are registered and unregistered Trademarks of Prudential and others. Nothing contained in
                this Website should be construed as granting, by implication, estoppel or otherwise, any license or
                right to use any Trademark displayed on this Website without the written permission of Prudential or
                such third party that may own the Trademarks displayed on this Website. Your use of the Trademarks
                displayed on this Website is strictly prohibited unless stated otherwise on this Website.
              </Text>
            </Box>
          </Box>
        </Section>
      </Box>
    </Grid>
  );
};

export default TermsUse;
