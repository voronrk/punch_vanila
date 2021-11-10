<?php
include_once "includes/functions.php";

function extractData($arData, $punch, $arCatalog=[]) {
    $arOutput = [];
    foreach($arData as $item) {
        if ($item['punch']==$punch) {
            if ($arCatalog) {
                $arOutput[]=$arCatalog[$item['value']-1]['value'];    //КОСТЫЛЬ!!! ПЕРЕДЕЛАТЬ!!!
            } else {
                $arOutput[]=$item['value'];
            };            
        };
    };
    $log=fopen('extract.log','a');
    fwrite($log,print_r($arOutput,true) . PHP_EOL);
    fclose($log);
    return $arOutput;
};

class back {

	public static function savePunch($arParams) {
        $newPunch = db_exec("INSERT INTO `punches`(
            `ordernum`, 
            `year`, 
            `sizelength`, 
            `sizewidth`, 
            `sizeheight`, 
            `knifesizelength`, 
            `knifesizewidth`) 
            VALUES (
            '{$arParams['ordernum'][0]}',
            '{$arParams['year'][0]}',
            '{$arParams['sizeLength'][0]}',
            '{$arParams['sizeWidth'][0]}',
            '{$arParams['sizeHeight'][0]}',
            '{$arParams['knifeSizeLength'][0]}',
            '{$arParams['knifeSizeWidth'][0]}'
            ) ");
        if ($newPunch) {
            $newPunchId = db_query("SELECT `id` FROM `punches` ORDER BY `id` DESC ; ")->fetchColumn();
            if ($newPunchId) {
                foreach($arParams['products'] as $product) {
                    db_exec("INSERT INTO `punch_products`(`punch`, `value`) VALUES ('{$newPunchId}', '{$product}') ");   
                };
                foreach($arParams['materials'] as $material) {
                    db_exec("INSERT INTO `punch_materials`(`punch`, `value`) VALUES ('{$newPunchId}', '{$material}') ");   
                };
                foreach($arParams['machines'] as $machine) {
                    db_exec("INSERT INTO `punch_machines`(`punch`, `value`) VALUES ('{$newPunchId}', '{$machine}') ");   
                };
                foreach($arParams['pic'] as $pic) {
                    db_exec("INSERT INTO `punch_pics`(`punch`, `value`) VALUES ('{$newPunchId}', '{$pic}') ");   
                };
            };
        }
        // $log=fopen('log.log','w');
        // fwrite($log,print_r($newPunchId,true));
        // fclose($log);
        return json_encode($newPunchId);
	}

    public static function getBase() {
        $arBase = db_query("SELECT * FROM `punches`; ")->fetchAll();
        $arMachines = db_query("SELECT `punch`, `value` FROM `punch_machines`; ")->fetchAll();
        $arMaterials = db_query("SELECT `punch`, `value` FROM `punch_materials`; ")->fetchAll();
        $arPics = db_query("SELECT `punch`, `value` FROM `punch_pics`; ")->fetchAll();
        $arProducts = db_query("SELECT `punch`, `value` FROM `punch_products`; ")->fetchAll();

        $arCatalogMachines = db_query("SELECT * FROM `machines`; ")->fetchAll();
        $arCatalogMaterials = db_query("SELECT * FROM `materials`; ")->fetchAll();
        $arCatalogProducts = db_query("SELECT * FROM `products`; ")->fetchAll();

        foreach($arBase as &$item) {
            $punch = $item['id'];
            $item['machines'] = extractData($arMachines, $punch, $arCatalogMachines);
            $item['materials'] = extractData($arMaterials, $punch, $arCatalogMaterials);
            $item['products'] = extractData($arProducts, $punch, $arCatalogProducts);
            $item['pics'] = extractData($arPics, $punch);
        };
        
        $log=fopen('base.log','w');
        fwrite($log,print_r($arBase,true) . PHP_EOL);
        // fwrite($log,print_r($arMachines,true) . PHP_EOL);
        // fwrite($log,print_r($arMaterials,true) . PHP_EOL);
        // fwrite($log,print_r($arPics,true) . PHP_EOL);
        // fwrite($log,print_r($arProducts,true) . PHP_EOL);
        // fwrite($log,print_r($arCatalogMachines,true) . PHP_EOL);
        // fwrite($log,print_r($arCatalogMaterials,true) . PHP_EOL);
        // fwrite($log,print_r($arCatalogProducts,true) . PHP_EOL);
        fclose($log);
        return json_encode($arBase);
    }
};

$params=json_decode(file_get_contents('php://input'),true);

// $log=fopen('params.log','w');
// fwrite($log,print_r($params['data'],true));
// fclose($log);

$workObj = new back();

switch ($params['mtd']) {
	case "savePunch":
		echo ($workObj -> savePunch($params['data']));
	break;
	case "getBase":
		echo ($workObj -> getBase());
	break;
};