import "./globals.css";

import { Toaster } from "@rallly/ui/sonner";
import { TooltipProvider } from "@rallly/ui/tooltip";
import { domAnimation, LazyMotion } from "motion/react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type React from "react";
import { Suspense } from "react";
import { PostHogSessionInit } from "@/app/[locale]/components/posthog-init";
import type { Params } from "@/app/[locale]/types";
import { RouterLoadingBar } from "@/components/router-loading-indicator";
import { SkipNavLink } from "@/components/skip-nav-link";
import { BrandingProvider } from "@/features/branding/client";
import { getInstanceBrandingConfig } from "@/features/branding/data";
import { InstancePolicyProvider } from "@/features/instance-policy/client";
import { loadInstancePolicy } from "@/features/instance-policy/loaders";
import { I18nProvider } from "@/i18n/client";
import { initI18next } from "@/i18n/i18n";
import { languages as supportedLngs } from "@/i18n/settings";
import { chunkRegistrationLogScript } from "@/lib/chunk-registration-log";
import { TimeZoneSync } from "@/lib/datetime/timezone-sync";
import { FeatureFlagsProvider } from "@/lib/feature-flags/client";
import { featureFlagConfig } from "@/lib/feature-flags/config";
import { ThemeProvider } from "@/lib/theme";
import { TRPCProvider } from "@/trpc/client/provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

async function loadData(locale: string) {
  const [brandingConfig, instancePolicy, { i18n }] = await Promise.all([
    getInstanceBrandingConfig(),
    loadInstancePolicy(),
    initI18next({ lng: locale }),
  ]);

  return {
    resources: i18n.store.data,
    brandingConfig,
    instancePolicy,
  };
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;

  if (!supportedLngs.includes(locale)) {
    notFound();
  }

  const { brandingConfig, instancePolicy, resources } = await loadData(locale);

  const brandingStyles = {
    "--primary-light": brandingConfig.primaryColor.light,
    "--primary-light-foreground": brandingConfig.primaryColor.lightForeground,
    "--primary-dark": brandingConfig.primaryColor.dark,
    "--primary-dark-foreground": brandingConfig.primaryColor.darkForeground,
  } as React.CSSProperties;

  return (
    <html
      lang={locale}
      className={inter.className}
      suppressHydrationWarning={true}
      style={brandingStyles}
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static diagnostics script with no user input
          dangerouslySetInnerHTML={{ __html: chunkRegistrationLogScript }}
        />
      </head>
      <body>
        <ThemeProvider>
          <FeatureFlagsProvider value={featureFlagConfig}>
            <InstancePolicyProvider value={instancePolicy}>
              <BrandingProvider value={brandingConfig}>
                <Toaster />
                <RouterLoadingBar />
                <I18nProvider locale={locale} resources={resources}>
                  <TRPCProvider>
                    <LazyMotion features={domAnimation}>
                      <SkipNavLink />
                      <TimeZoneSync>
                        <TooltipProvider>
                          <Suspense>
                            <PostHogSessionInit>{children}</PostHogSessionInit>
                          </Suspense>
                        </TooltipProvider>
                      </TimeZoneSync>
                    </LazyMotion>
                  </TRPCProvider>
                </I18nProvider>
              </BrandingProvider>
            </InstancePolicyProvider>
          </FeatureFlagsProvider>
          <footer className="flex flex-wrap justify-center gap-x-4 gap-y-2 p-3 text-muted-foreground text-sm">
            <a
              className="underline underline-offset-4"
              href={`https://github.com/t-syunya/rallly-ja/tree/${process.env.NEXT_PUBLIC_SOURCE_REVISION || "main"}`}
            >
              Rallly 日本語版 — Source code
            </a>
            <a
              className="underline underline-offset-4"
              href="https://github.com/t-syunya/rallly-ja/blob/main/LICENSE"
            >
              AGPLv3+
            </a>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const brandingConfig = await getInstanceBrandingConfig();

  return {
    title: {
      template: "%s",
      default: brandingConfig.appName,
    },
  };
}
