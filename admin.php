<?php
    include_once "includes/functions.php";
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
    <link rel="stylesheet" href="style.css">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> -->

    <script type="module" src="js/admin.js" defer></script>
    <title>Каталог штанц-форм</title>
</head>
<body>
    <div class="container">
        <nav class="navbar">
        <div class="navbar-end">
            <div class="navbar-item">
            <div class="buttons">
                <a class="button is-primary">
                <strong>Войти</strong>
                </a>
            </div>
            </div>
        </div>
        </nav>

        <section class="section">
        <form class="form" id="addPunch">
            <div class="columns">
                <div class="column is-3">
                <div class="field" id="products">
                    <label class="label">Виды продукции</label>
                    <div class="field-wrapper-full">
                        <?php
                            $products = db_query("SELECT * FROM `products`; ");
                            while($product = $products->fetch()) {?>
                                <label class="checkbox"><input type="checkbox" id="<?php echo 'products-'. $product['id']?>"><?php echo $product['value']?></label>
                            <?php }; ?>
                    </div>
                </div>
                   
                   <div class="field" id="materials">
                       <label class="label">Виды материалов</label>
                       <div class="field-wrapper-full">
                       <?php
                            $materials = db_query("SELECT * FROM `materials`; ");
                            while($material = $materials->fetch()) {?>
                                <label class="checkbox"><input type="checkbox" id="<?php echo 'materials-'.$material['id']?>"><?php echo $material['value']?></label>
                            <?php }; ?>
                       </div>
                   </div>

                   <div class="field" id="machines">
                       <label class="label">Оборудование</label>
                       <div class="field-wrapper-full">
                       <?php
                            $machines = db_query("SELECT * FROM `machines`; ");
                            while($machine = $machines->fetch()) {?>
                                <label class="checkbox"><input type="checkbox" id="<?php echo 'machines-'.$machine['id']?>"><?php echo $machine['value']?></label>
                        <?php }; ?>
                       </div>
                   </div>
                </div>
                <div class="column is-2">
                <div class="field" id="size-width">
                       <label class="label">Размеры изделия</label>
                       <div class="field is-horizontal">
                           <div class="field-label is-normal">
                             <label class="label has-text-weight-normal">Длина</label>
                           </div>
                           <div class="field-body">
                             <div class="field">
                               <p class="control">
                                 <input class="input  is-small" type="number" id="sizeLength">
                               </p>
                             </div>
                           </div>
                       </div>
                       <div class="field is-horizontal">
                           <div class="field-label is-normal">
                             <label class="label has-text-weight-normal">Ширина</label>
                           </div>
                           <div class="field-body">
                             <div class="field">
                               <p class="control">
                                 <input class="input  is-small" type="number" id="sizeWidth">
                               </p>
                             </div>
                           </div>
                       </div>
                       <div class="field is-horizontal">
                           <div class="field-label is-normal">
                             <label class="label has-text-weight-normal">Высота</label>
                           </div>
                           <div class="field-body">
                             <div class="field">
                               <p class="control">
                                 <input class="input  is-small" type="number" id="sizeHeight">
                               </p>
                             </div>
                           </div>
                       </div>
                   </div>

                   <div class="field" id="size-knife">
                       <label class="label">Размеры по ножам</label>
                       <div class="field is-horizontal">
                           <div class="field-label is-normal">
                             <label class="label has-text-weight-normal">Длина</label>
                           </div>
                           <div class="field-body">
                             <div class="field">
                               <p class="control">
                                 <input class="input  is-small" type="number" id="knifeSizeLength">
                               </p>
                             </div>
                           </div>
                       </div>
                       <div class="field is-horizontal">
                           <div class="field-label is-normal">
                             <label class="label has-text-weight-normal">Высота</label>
                           </div>
                           <div class="field-body">
                             <div class="field">
                               <p class="control">
                                 <input class="input  is-small" type="number" id="knifeSizeWidth">
                               </p>
                             </div>
                           </div>
                       </div>
                   </div>

                   <div class="field">
                       <label class="label">Год</label>
                       <div class="select is-small">
                            <select id="year" value=<?php echo date('Y')?>>
                                <?php for ($i=date('Y'); $i>2012; $i--) {?>
                                    <option><?php echo $i; ?></option>
                                <?php }; ?>
                            </select>
                        </div>
                   </div>

                   <div class="field" >
                       <label class="label">Номер заказа</label>
                       <input type="text" class="input is-small" id="ordernum">
                   </div>

                   <div class="field" id="pic">
                       <label class="label">Картинка</label>
                        <input type="text" class="input is-small" id='pic-1'>
                       <div class="field-add is-size-7 has-text-info">Добавить</div>
                   </div>

                   <div class="field" >
                    <div class="button is-primary" id="submit">Сохранить</div>
                   </div>
                   <div class="field" >
                    <div class="button is-primary" id="cancel">Очистить</div>
                   </div>
                </div>
            </div>
            </form>
        </section>
    </div>
</body>
</html>