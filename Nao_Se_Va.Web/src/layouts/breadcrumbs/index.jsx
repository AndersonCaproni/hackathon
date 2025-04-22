import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import styles from "./_breadcrumbs.module.css";
import { NavigateNext } from "@mui/icons-material";

const Breadcrumbs = ({
    card,
    icons,
    maxItems,
    rightAlign = true,
    separator = <NavigateNext fontSize="small" />,
    title = true,
    titleBottom,
    navigation,
}) => {
    const location = useLocation();
    const iconSX = {
        marginRight: 6,
        marginTop: -2,
        width: "1.4rem",
        height: "1.4rem",
    };
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const traverseMenu = (menu, path) => {
        for (let item of menu) {
            if (item.url) {
                const regex = new RegExp("^" + item.url.replace(/:\w+/g, "[^/]+") + "$");
                if (regex.test(path)) { 
                    return [{ ...item, resolvedUrl: path }];
                }
            }
            if (item.children) {
                const childPath = traverseMenu(item.children, path);
                if (childPath.length) {
                    return [{ ...item }, ...childPath];
                }
            }
        }
        return [];
    };

    useEffect(() => {
        const path = location.pathname;
        const matchedBreadcrumbs = traverseMenu(navigation.items, path);
        setBreadcrumbs(matchedBreadcrumbs);
    }, [location, navigation]);

    const SeparatorIcon = separator;
    const separatorIcon = separator ? SeparatorIcon : NavigateNext;

    let itemContent = breadcrumbs?.map((breadcrumb, index) =>
        <Typography
            key={index}
            className={styles.rota}
            sx={{
                display: "flex",
                color: "grey.900",
                textDecoration: "none",
                alignContent: "center",
                alignItems: "center",
                color: "text.secondary",
                fontWeight: "bold",
                fontSize: breadcrumb?.tamanho,
                "&:hover":{
                    color: "#257ae9",
                }

            }}
            component={Link}
            to={breadcrumb?.resolvedUrl || breadcrumb?.url}
        >
            {icons && breadcrumb?.icon && <breadcrumb.icon style={iconSX} />}
            {breadcrumb?.title}
        </Typography>
    );

    const tempContent = (
        <MuiBreadcrumbs
            aria-label="breadcrumb"
            maxItems={maxItems || 8}
            separator={separatorIcon}
        >
            {itemContent}
        </MuiBreadcrumbs>
    );

    const breadcrumbContent = (
        <Card
            sx={{
                mt: 2,
                mr: 2,
                mb: 2,
                position: "relative",
                backgroundColor: "#ffffff",
                boxShadow: "4px 4px 10px 0px rgba(37, 122, 233, 0.4)",
                height: "6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 6,
                paddingRight: 6,
                borderRadius: "10px !important",

            }}
        >
            <Box sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
            }}>
                <Grid
                    container
                    direction={rightAlign ? "row" : "column"}
                    justifyContent={rightAlign ? "space-between" : "flex-start"}
                    alignItems={rightAlign ? "center" : "flex-start"}
                    spacing={1}
                    sx={{ width: "100%" }}
                >
                    {title && !titleBottom && (
                        <Grid >
                            <Typography variant="h4" className={location.pathname === '/dash/ia' ? styles.reflexoAnimado : styles.titulo} sx={{ fontWeight: 500 }}>
                                {breadcrumbs?.[breadcrumbs?.length - 1]?.title}
                            </Typography>
                        </Grid>
                    )}
                    <Grid >{tempContent}</Grid>
                </Grid>
            </Box>
        </Card>
    );

    return breadcrumbContent;
};

export default Breadcrumbs;
