import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text
} from "@react-email/components";

import { TOKEN_EXPIRY_TIME_IN_MIN } from "@/constants";

interface APIKeyRecoveryTemplateProps {
    token: string;
}

export default function APIKeyRecoveryTemplate({
    token
}: APIKeyRecoveryTemplateProps) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

    return (
        <Html>
            <Head />
            <Preview>RaveHQ API Key Recovery</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img src={`${baseUrl}/logo.png`} alt="RaveHQ Logo" className="h-[30px] w-auto" />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>Recover your API key</Heading>
                            <Text style={mainText}>
                                We received a request to recover your RaveHQ API key. Your recovery code is below.
                            </Text>
                            <Section style={verificationSection}>
                                <Text style={verifyText}>API recovery code</Text>
                                <Text style={codeText}>{token}</Text>
                                <Text style={validityText}>
                                    (This code is valid for {TOKEN_EXPIRY_TIME_IN_MIN} minutes)
                                </Text>
                            </Section>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                If you didn&apos;t request to recover your API key, please disregard this email. If you believe your account may have been compromised, we recommend changing your RaveHQ account password immediately.
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        Copyright © {" "}
                        <Link href={baseUrl} target="_blank" style={link}>
                            RaveHQ
                        </Link>
                        {" "} {(new Date()).getFullYear()} - All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#fff",
    color: "#212121"
};

const container = {
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#eee"
};

const h1 = {
    color: "#333",
    fontFamily:
        "'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px"
};

const link = {
    color: "#2754C5",
    fontFamily:
        "'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline"
};

const text = {
    color: "#333",
    fontFamily:
        "'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0"
};

const imageSection = {
    backgroundColor: "#ccc",
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "center"
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
    ...text,
    fontSize: "12px",
    padding: "0 20px",
    textAlign: "center" as const
};

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: "bold",
    textAlign: "center" as const
};

const codeText = {
    ...text,
    fontWeight: "bold",
    fontSize: "36px",
    margin: "10px 0",
    textAlign: "center" as const
};

const validityText = {
    ...text,
    margin: "0px",
    textAlign: "center" as const
};

const verificationSection = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };